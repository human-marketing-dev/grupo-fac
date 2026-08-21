/**
 * Contrato compartido del formulario de cotización.
 *
 * Lo importan TANTO el cliente (components/forms/QuoteForm.tsx) como el
 * servidor (app/api/leads/route.ts), a propósito: así las reglas de validación
 * y la lista de servicios son las mismas en ambos lados y no se pueden
 * desincronizar. Solo funciones puras — nada de red ni de entorno.
 *
 * La validación de cliente es cortesía para el usuario; la del servidor es la
 * que manda. El route NUNCA confía en que el cliente ya validó.
 */

export interface ServicioOption {
  value: string;
  label: string;
}

/** Lista canónica. El servidor rechaza cualquier `servicio` fuera de aquí. */
export const SERVICIOS: readonly ServicioOption[] = [
  { value: "nave", label: "Nave industrial" },
  { value: "cedis", label: "CEDIS" },
  { value: "parque", label: "Parque industrial" },
  { value: "obra-civil", label: "Obra civil e infraestructura" },
  { value: "llave-en-mano", label: "Proyecto llave en mano" },
];

export function etiquetaServicio(value: string): string {
  return SERVICIOS.find((s) => s.value === value)?.label ?? value;
}

export const LEAD_FIELDS = [
  "nombre",
  "empresa",
  "email",
  "telefono",
  "servicio",
  "alcance",
] as const;

export type LeadField = (typeof LEAD_FIELDS)[number];
export type Lead = Record<LeadField, string>;
export type LeadErrors = Partial<Record<LeadField, string>>;

/** Nombre del campo trampa. Debe llegar vacío; si trae algo, es un bot. */
export const HONEYPOT_FIELD = "website";

export const LIMITES = {
  nombre: { min: 2, max: 80 },
  empresa: { min: 2, max: 120 },
  email: { max: 160 },
  telefono: { minDigitos: 10, maxDigitos: 15, max: 25 },
  alcance: { min: 10, max: 2000 },
} as const;

// Caracteres de control ASCII + DEL. Se eliminan de todo lo que escribe el
// usuario porque `nombre` acaba en el asunto del correo y en `replyTo`: aunque
// la API de Brevo es JSON y no SMTP crudo, dejar pasar CR/LF hacia una cabecera
// es un patrón que no conviene tener nunca.
const CONTROL = /[\u0000-\u001F\u007F]/g;
// Igual, pero conservando el salto de linea (\\n) en campos multilinea.
const CONTROL_SIN_SALTO = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

export function limpiar(v: unknown, { multilinea = false } = {}): string {
  if (typeof v !== "string") return "";
  const sinControl = multilinea
    ? v.replace(CONTROL_SIN_SALTO, "")
    : v.replace(CONTROL, " ");
  return sinControl.trim();
}

// Deliberadamente permisivo pero suficiente: un solo @, algo antes, y un
// dominio con punto y TLD de 2+ letras. Sin espacios ni separadores de lista.
const EMAIL_RE = /^[^\s@,;:<>()[\]\\"]+@[^\s@,;:<>()[\]\\".]+\.[A-Za-z]{2,}$/;

export function emailValido(v: string): boolean {
  return v.length <= LIMITES.email.max && EMAIL_RE.test(v);
}

/**
 * Valida un lead completo. Devuelve los datos ya normalizados, o los errores
 * por campo en español, listos para pintarse debajo de cada input.
 *
 * TODOS los campos son obligatorios (decisión del cliente, 2026-08-21).
 */
export function validarLead(
  raw: unknown,
): { ok: true; data: Lead } | { ok: false; errors: LeadErrors } {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: LeadErrors = {};

  const nombre = limpiar(src.nombre);
  const empresa = limpiar(src.empresa);
  const email = limpiar(src.email).toLowerCase();
  const telefono = limpiar(src.telefono);
  const servicio = limpiar(src.servicio);
  const alcance = limpiar(src.alcance, { multilinea: true });

  if (!nombre) errors.nombre = "Escribe tu nombre.";
  else if (nombre.length < LIMITES.nombre.min) errors.nombre = "El nombre es demasiado corto.";
  else if (nombre.length > LIMITES.nombre.max)
    errors.nombre = `El nombre no puede pasar de ${LIMITES.nombre.max} caracteres.`;

  if (!empresa) errors.empresa = "Escribe el nombre de tu empresa.";
  else if (empresa.length < LIMITES.empresa.min) errors.empresa = "El nombre es demasiado corto.";
  else if (empresa.length > LIMITES.empresa.max)
    errors.empresa = `No puede pasar de ${LIMITES.empresa.max} caracteres.`;

  if (!email) errors.email = "Escribe tu correo.";
  else if (!emailValido(email)) errors.email = "Revisa el formato del correo.";

  const digitos = telefono.replace(/\D/g, "");
  if (!telefono) errors.telefono = "Escribe tu teléfono.";
  else if (telefono.length > LIMITES.telefono.max || /[^\d\s+()-]/.test(telefono))
    errors.telefono = "El teléfono solo puede llevar dígitos, espacios y + ( ) -";
  else if (digitos.length < LIMITES.telefono.minDigitos)
    errors.telefono = `El teléfono debe tener al menos ${LIMITES.telefono.minDigitos} dígitos.`;
  else if (digitos.length > LIMITES.telefono.maxDigitos)
    errors.telefono = "Revisa el teléfono: tiene demasiados dígitos.";

  if (!servicio) errors.servicio = "Elige el servicio que te interesa.";
  else if (!SERVICIOS.some((s) => s.value === servicio))
    errors.servicio = "Elige una opción de la lista.";

  if (!alcance) errors.alcance = "Cuéntanos el alcance de tu proyecto.";
  else if (alcance.length < LIMITES.alcance.min)
    errors.alcance = `Describe el alcance con al menos ${LIMITES.alcance.min} caracteres.`;
  else if (alcance.length > LIMITES.alcance.max)
    errors.alcance = `No puede pasar de ${LIMITES.alcance.max} caracteres.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { nombre, empresa, email, telefono, servicio, alcance } };
}
