import { HONEYPOT_FIELD, etiquetaServicio, limpiar, validarLead, type Lead } from "@/lib/leads";

/**
 * Recepción de leads del formulario de cotización y envío por Brevo.
 *
 * Reglas duras:
 * - Remitente y destinatario salen SIEMPRE de variables de entorno. Nunca del
 *   body. Así el endpoint no puede usarse como relay hacia terceros.
 * - Todo valor del usuario se escapa antes de interpolarse en el HTML.
 * - Los errores de Brevo se registran en el servidor con status y cuerpo, pero
 *   al cliente solo le llega un mensaje genérico.
 *
 * Los POST no se cachean por defecto en Next 16, así que no hace falta
 * `dynamic = "force-dynamic"`.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const SENDER_NAME = "Grupo Fac";
const TIMEOUT_MS = 10_000;

const ERROR_GENERICO =
  "No pudimos enviar tu solicitud en este momento. Inténtalo de nuevo en unos minutos.";

// ── Rate limiting ────────────────────────────────────────────────────────────
// Contador en memoria del proceso. Es efectivo en ESTA infraestructura —
// RunCloud + PM2, un solo proceso Node persistente, una sola instancia — y NO
// lo sería en serverless con varias instancias, donde cada una tendría su
// propio Map. Si algún día se migra a Vercel/Lambda, esto hay que sustituirlo
// por almacenamiento externo.
const MAX_PETICIONES = 5;
const VENTANA_MS = 10 * 60 * 1000;
const BARRIDO_CADA_MS = 60 * 1000;

const golpes = new Map<string, number[]>();
let ultimoBarrido = 0;

function barrer(ahora: number) {
  if (ahora - ultimoBarrido < BARRIDO_CADA_MS) return;
  ultimoBarrido = ahora;
  for (const [ip, marcas] of golpes) {
    const vivas = marcas.filter((t) => ahora - t < VENTANA_MS);
    if (vivas.length === 0) golpes.delete(ip);
    else golpes.set(ip, vivas);
  }
}

/** true si la petición se permite; false si excede el límite. */
function permitir(ip: string): boolean {
  const ahora = Date.now();
  barrer(ahora);
  const previas = (golpes.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= MAX_PETICIONES) {
    golpes.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  golpes.set(ip, previas);
  return true;
}

/**
 * IP del cliente. Detrás de NGINX el socket siempre es 127.0.0.1, así que el
 * dato útil es `x-forwarded-for`, cuyo primer valor es el cliente original.
 */
function ipDe(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const primera = xff.split(",")[0]?.trim();
    if (primera) return primera;
  }
  return request.headers.get("x-real-ip")?.trim() || "desconocida";
}

// ── Cuerpo del correo ────────────────────────────────────────────────────────

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escaparHtml(v: string): string {
  return v.replace(/[&<>"']/g, (c) => ESCAPES[c]!);
}

function fila(etiqueta: string, valor: string): string {
  return (
    `<tr>` +
    `<td style="padding:8px 16px 8px 0;color:#777777;font:500 12px/1.4 monospace;` +
    `text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">` +
    `${escaparHtml(etiqueta)}</td>` +
    `<td style="padding:8px 0;color:#191919;font:400 15px/1.6 Arial,sans-serif">` +
    `${escaparHtml(valor).replace(/\n/g, "<br>")}</td>` +
    `</tr>`
  );
}

function cuerpoHtml(lead: Lead): string {
  const servicio = etiquetaServicio(lead.servicio);
  return (
    `<div style="background:#f4f3f1;padding:24px">` +
    `<div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e8e7e5">` +
    `<div style="height:4px;background:#f5bf25"></div>` +
    `<div style="padding:24px 28px">` +
    `<p style="margin:0 0 4px;color:#777777;font:500 12px/1.4 monospace;` +
    `text-transform:uppercase;letter-spacing:.18em">Nuevo lead del sitio web</p>` +
    `<h1 style="margin:0 0 20px;color:#191919;font:700 22px/1.2 Arial,sans-serif">` +
    `${escaparHtml(lead.nombre)}</h1>` +
    `<table style="width:100%;border-collapse:collapse">` +
    fila("Nombre", lead.nombre) +
    fila("Empresa", lead.empresa) +
    fila("Correo", lead.email) +
    fila("Teléfono", lead.telefono) +
    fila("Servicio", servicio) +
    fila("Alcance", lead.alcance) +
    `</table>` +
    `<p style="margin:20px 0 0;padding-top:16px;border-top:1px solid #e8e7e5;` +
    `color:#777777;font:400 13px/1.5 Arial,sans-serif">` +
    `Responde a este correo para contestarle directamente a ${escaparHtml(lead.nombre)}.</p>` +
    `</div></div></div>`
  );
}

function cuerpoTexto(lead: Lead): string {
  return [
    "Nuevo lead del sitio web",
    "",
    `Nombre:   ${lead.nombre}`,
    `Empresa:  ${lead.empresa}`,
    `Correo:   ${lead.email}`,
    `Teléfono: ${lead.telefono}`,
    `Servicio: ${etiquetaServicio(lead.servicio)}`,
    "",
    "Alcance del proyecto:",
    lead.alcance,
  ].join("\n");
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  if (!permitir(ipDe(request))) {
    return Response.json(
      { ok: false, error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 },
    );
  }

  // Un body que no sea JSON válido es un 400, nunca un 500.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: ERROR_GENERICO }, { status: 400 });
  }

  // Honeypot: si el campo trampa trae algo, respondemos como si todo hubiera
  // ido bien y no enviamos nada. El bot no debe enterarse de que lo detectamos.
  const trampa = limpiar((body as Record<string, unknown> | null)?.[HONEYPOT_FIELD]);
  if (trampa) {
    return Response.json({ ok: true });
  }

  const resultado = validarLead(body);
  if (!resultado.ok) {
    return Response.json({ ok: false, errors: resultado.errors }, { status: 400 });
  }
  const lead = resultado.data;

  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  const destino = process.env.LEADS_TO_EMAIL;
  if (!apiKey || !sender || !destino) {
    console.error(
      "[leads] Faltan variables de entorno:",
      [
        !apiKey && "BREVO_API_KEY",
        !sender && "BREVO_SENDER_EMAIL",
        !destino && "LEADS_TO_EMAIL",
      ]
        .filter(Boolean)
        .join(", "),
    );
    return Response.json({ ok: false, error: ERROR_GENERICO }, { status: 500 });
  }

  const payload = {
    sender: { email: sender, name: SENDER_NAME },
    to: [{ email: destino }],
    replyTo: { email: lead.email, name: lead.nombre },
    subject: `[Lead web] ${lead.nombre} — GrupoFAC`,
    htmlContent: cuerpoHtml(lead),
    textContent: cuerpoTexto(lead),
  };

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      const detalle = await res.text().catch(() => "<sin cuerpo>");
      console.error(`[leads] Brevo respondió ${res.status} ${res.statusText}:`, detalle);
      return Response.json({ ok: false, error: ERROR_GENERICO }, { status: 502 });
    }
  } catch (err) {
    console.error("[leads] Fallo al llamar a Brevo:", err);
    return Response.json({ ok: false, error: ERROR_GENERICO }, { status: 502 });
  }

  return Response.json({ ok: true });
}
