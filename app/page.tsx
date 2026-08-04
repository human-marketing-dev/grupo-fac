import type { Metadata } from "next";
import {
  Accordion,
  Button,
  Eyebrow,
  FeatureList,
  Footer,
  GhostNumeral,
  HatchDivider,
  Marquee,
  Navbar,
  NumberedFeature,
  ProcessStep,
  QuoteForm,
} from "@/components";
import { Pending } from "@/components/landing/Pending";
import { ScopeCard } from "@/components/landing/ScopeCard";
import { TestimonialCard } from "@/components/landing/TestimonialCard";

/**
 * Landing de campaña — Construcción de Naves Industriales (Google Ads,
 * Monterrey / Nuevo León).
 *
 * Sigue al pie de la letra el documento de copy v3 del cliente: la estructura
 * de 10 bloques, un solo H1 (Hero), H2 por bloque y H3 en servicios,
 * diferenciadores, pasos del proceso y preguntas frecuentes.
 *
 * Todo `[placeholder]` del documento se renderiza como <Pending> — busca
 * "<Pending" para listar lo que falta del cliente.
 */

export const metadata: Metadata = {
  title: "Construcción de Naves Industriales en Monterrey",
  description:
    "Más de 10 años construyendo naves y parques industriales llave en mano en Monterrey y Nuevo León: ingeniería, obra civil, instalaciones y entrega con un solo equipo responsable.",
};

const CONTAINER: React.CSSProperties = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
  padding: "var(--section-y-tight) var(--gutter)",
};

const GRID_SHELL: React.CSSProperties = {
  background: "var(--neutral-950)",
  backgroundImage: "var(--texture-grid)",
};

/**
 * Encabezado de bloque. El documento etiqueta el nombre del bloque como H2 y
 * la línea de gancho como (p) — se respeta esa jerarquía tal cual.
 */
function SectionHead({
  n,
  title,
  lead,
  body,
  invert = false,
}: {
  n: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  body?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: 760 }}>
      <Eyebrow color={invert ? "var(--fac-yellow-press)" : "var(--text-accent)"}>{n}</Eyebrow>
      <h2
        style={{
          fontSize: "var(--fs-h1)",
          lineHeight: "var(--lh-heading)",
          letterSpacing: "var(--ls-heading)",
          fontWeight: "var(--fw-bold)",
          color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h3)",
            lineHeight: 1.25,
            fontWeight: "var(--fw-semibold)",
            color: invert ? "var(--text-on-invert)" : "var(--text-secondary)",
            margin: 0,
          }}
        >
          {lead}
        </p>
      ) : null}
      {body ? (
        <p
          style={{
            fontSize: "var(--fs-body-lg)",
            lineHeight: "var(--lh-body)",
            color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
            margin: 0,
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Franja de aviso para contenido de relleno que SÍ se ve terminado.
 *
 * A diferencia de <Pending>, que deja un hueco evidente, aquí el bloque se ve
 * publicable — por eso el aviso tiene que ser imposible de pasar por alto.
 */
function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-4)",
        marginTop: "var(--space-8)",
        padding: "var(--space-4) var(--space-5)",
        border: "1px dashed var(--fac-yellow)",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-inset)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: "var(--fw-semibold)",
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "var(--fac-yellow)",
          flex: "none",
          paddingTop: 1,
        }}
      >
        Demo
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-caption)",
          lineHeight: "var(--lh-body)",
          color: "var(--text-muted)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

/** Dato del trust bar. `pending` marca las cifras que el cliente aún no envía. */
function TrustItem({ value, label, pending = false }: { value: string; label: string; pending?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h3)",
          fontWeight: "var(--fw-black)",
          letterSpacing: "var(--ls-display)",
          color: "var(--fac-yellow)",
          ...(pending
            ? { borderBottom: "1px dashed var(--fac-yellow-dim)", opacity: 0.85 }
            : null),
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-eyebrow)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

const ALCANCE = [
  {
    title: "Planeación y Desarrollo de Ingeniería",
    description:
      "Diseño estructural y memorias de cálculo pensados para evitar retrabajos y sobrecostos antes de que empiece la obra.",
  },
  {
    title: "Construcción de Naves Industriales y CEDIS",
    description:
      "Estructura, cubiertas y pisos industriales construidos bajo estándares que soportan tu operación desde el primer día.",
  },
  {
    title: "Obra Civil e Infraestructura",
    description:
      "Urbanización, vialidades y drenajes que dejan tu parque industrial completamente funcional, no solo construido.",
  },
  {
    title: "Instalaciones Especializadas",
    description:
      "Redes eléctricas, hidráulicas y contra incendio integradas, para que tu nave esté lista para operar sin pendientes técnicos.",
  },
  {
    title: "Gestión y Supervisión de Obra",
    description:
      "Control de costos y seguimiento constante, para que sepas en todo momento en qué punto va tu inversión.",
  },
  {
    title: "Proyectos Llave en Mano",
    description:
      "Un solo equipo responsable del concepto a la entrega — recibes una nave lista para producir, no una lista de pendientes.",
  },
];

// El "01" lo propuso la agencia porque el original no venía en el brief:
// está marcado como pendiente de validación en el documento de copy.
const DIFERENCIADORES = [
  {
    number: "01",
    title: "Ejecución integral",
    description:
      "Un solo equipo, una sola responsabilidad: tu proyecto avanza sin fricciones entre proveedores.",
  },
  {
    number: "02",
    title: "Tiempos competitivos",
    description:
      "Menor dependencia de proveedores externos significa que tu fecha de arranque no depende de la agenda de alguien más.",
  },
  {
    number: "03",
    title: "Calidad verificada",
    description:
      "Pruebas y supervisión constante que protegen tu inversión a largo plazo, no solo el día de la entrega.",
  },
  {
    number: "04",
    title: "Experiencia industrial",
    description:
      "Enfoque exclusivo en naves y proyectos logísticos: entendemos lo que tu operación necesita para funcionar, no solo para verse terminada.",
  },
];

// Secuencia propuesta: pendiente de validar contra el proceso real de Grupo FAC.
const PROCESO = [
  {
    code: "01",
    title: "Contacto y levantamiento",
    description: "Entendemos tu operación y tus tiempos antes de proponer nada.",
  },
  {
    code: "02",
    title: "Propuesta técnica y económica",
    description: "Sabes exactamente qué vas a recibir y cuánto va a costar, sin letras chiquitas.",
  },
  {
    code: "03",
    title: "Ejecución llave en mano",
    description:
      "Avanzamos obra civil, estructura e instalaciones bajo un solo equipo, sin que tengas que estar encima del proyecto.",
  },
  {
    code: "04",
    title: "Entrega y puesta en marcha",
    description: "Recibes una nave lista para producir, no una obra por terminar.",
  },
];

/**
 * CONTENIDO DE RELLENO — NO ES REAL.
 *
 * Personas y empresas inventadas, escritas solo para poder evaluar el diseño
 * del bloque. Deliberadamente NO se usan los clientes reales de Grupo FAC
 * (Volvo, Brembo, Hofusan, RC Parks, Manares…): atribuirles una cita que nunca
 * dijeron sería inventar una recomendación de una empresa real.
 *
 * Reemplazar por testimonios reales, con autorización por escrito de cada
 * empresa, antes de publicar.
 */
const TESTIMONIOS_DEMO = [
  {
    quote:
      "Necesitábamos la nave operando antes del cierre de año y esa fecha no se movió. Tener obra civil, estructura e instalaciones con un solo responsable nos quitó las juntas de coordinación entre proveedores.",
    name: "Nombre Apellido",
    role: "Director de Operaciones",
    company: "Empresa demo 1 · Apodaca",
  },
  {
    quote:
      "Lo que más valoramos fue la etapa de ingeniería. Detectaron cambios en el diseño estructural antes de arrancar, y eso nos evitó retrabajos que ya habíamos sufrido en una obra anterior.",
    name: "Nombre Apellido",
    role: "Gerente de Proyectos",
    company: "Empresa demo 2 · Santa Catarina",
  },
  {
    quote:
      "Entregaron la nave lista para producir, no una obra con pendientes. Recibimos el expediente técnico completo y pudimos instalar la línea sin esperar a nadie.",
    name: "Nombre Apellido",
    role: "Director de Planta",
    company: "Empresa demo 3 · Ciénega de Flores",
  },
];

const FAQ = [
  {
    question: "¿Cuánto cuesta la construcción de una nave industrial por m²?",
    answer: "[respuesta por redactar — depende de datos reales de la operación]",
  },
  {
    question: "¿Cuánto tiempo toma construir una nave industrial en Nuevo León?",
    answer: "[respuesta por redactar]",
  },
  {
    question: "¿Qué incluye un proyecto de construcción industrial llave en mano?",
    answer: "[respuesta por redactar]",
  },
  {
    question: "¿Grupo FAC construye también parques industriales completos?",
    answer: "[respuesta por redactar]",
  },
  {
    question: "¿En qué zonas de Nuevo León trabajan?",
    answer: "[respuesta por redactar]",
  },
];

export default function NavesIndustrialesLanding() {
  return (
    <>
      <Navbar logo="/logo-fac-white.png" phone="+52 81 8486 1870" ctaHref="#cotizar" cta="Cotiza tu proyecto" />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section style={{ ...GRID_SHELL, position: "relative", overflow: "hidden" }}>
        <div style={{ ...CONTAINER, position: "relative", paddingBlock: "var(--space-32)" }}>
          <GhostNumeral size={300} style={{ top: -40, right: -20 }}>
            FAC
          </GhostNumeral>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: 880 }}>
            <Eyebrow>Monterrey · Nuevo León</Eyebrow>
            <h1
              style={{
                fontSize: "var(--fs-display-2)",
                lineHeight: "var(--lh-display)",
                letterSpacing: "var(--ls-display)",
                fontWeight: "var(--fw-black)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Construcción de Naves Industriales en Monterrey
            </h1>
            <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-secondary)", maxWidth: 720 }}>
              Más de 10 años de experiencia construyendo naves y parques industriales llave en mano:
              ingeniería, obra civil, instalaciones y entrega, con un solo equipo responsable de que
              tu proyecto arranque a tiempo.
            </p>
            <div style={{ marginTop: "var(--space-2)" }}>
              <Button variant="primary" size="lg" href="#cotizar" icon="→">
                Cotiza tu proyecto
              </Button>
            </div>
          </div>

          {/* trust bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-6) var(--space-10)",
              alignItems: "center",
              marginTop: "var(--space-16)",
              paddingTop: "var(--space-8)",
              borderTop: "1px solid var(--line-hairline)",
            }}
          >
            <TrustItem pending value="+X" label="Años de experiencia" />
            <TrustItem pending value="+X" label="m² construidos" />
            <TrustItem pending value="+X" label="Proyectos entregados" />
            <TrustItem value="—" label="Maquinaria propia" />
          </div>
          <p
            style={{
              marginTop: "var(--space-4)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--fac-yellow-dim)",
            }}
          >
            Pendiente: cifras reales del trust bar
          </p>
        </div>
      </section>

      <Marquee
        items={[
          "Naves industriales",
          "CEDIS",
          "Parques industriales",
          "Obra civil",
          "Instalaciones especializadas",
          "Llave en mano",
        ]}
      />

      {/* ── 2. Propuesta de valor ───────────────────────────────────────── */}
      <section id="propuesta" style={CONTAINER}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
            gap: "var(--space-16)",
            alignItems: "start",
          }}
        >
          <SectionHead
            n="02"
            title="Propuesta de valor"
            lead="Ejecución total para tu proyecto industrial"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            <p style={{ fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>
              En Grupo FAC combinamos ingeniería, experiencia en obra y una flota completa de
              maquinaria propia para entregar naves y parques industriales listos para operar.
              Integramos cada etapa crítica de la construcción —desde la cimentación hasta las
              instalaciones— bajo un solo equipo responsable, lo que se traduce en menos riesgos,
              menos costos y menos tiempo para que tu proyecto esté en marcha.
            </p>
            <FeatureList
              items={[
                "Control total del proyecto, sin terceros innecesarios — evitas fricciones y responsabilidades diluidas",
                "Procesos estandarizados de seguridad y calidad — tu inversión protegida en cada etapa",
                "Ingeniería interna y supervisión especializada — menos errores, menos retrabajos",
                "Capacidad para obras de alto volumen — tu proyecto no se detiene por falta de recursos",
                "Flota propia de maquinaria pesada — tu cronograma no depende de terceros",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 3. Alcance del servicio — el único bloque en hueso de la página ─ */}
      <section id="alcance" style={{ background: "var(--surface-invert)" }}>
        <div style={CONTAINER}>
          <SectionHead
            invert
            n="03"
            title="Alcance del servicio"
            lead="Todo lo que tu nave necesita para estar lista para operar"
            body="No subcontratamos las etapas críticas. Desde el primer plano hasta el último detalle de instalación, participamos en cada fase para que tu proyecto llegue a la meta real: operar sin pendientes."
          />
          {/* 6 servicios en 2 filas de 3 — columnas fijas, no auto-fit, que a
              1450px daría 4 y dejaría una fila coja de 2. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: "var(--space-6)",
              marginTop: "var(--space-12)",
            }}
          >
            {ALCANCE.map((s, i) => (
              <ScopeCard
                key={s.title}
                invert
                index={String(i + 1).padStart(2, "0")}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Diferenciadores ──────────────────────────────────────────── */}
      <section id="diferenciadores" style={GRID_SHELL}>
        <div style={CONTAINER}>
          <SectionHead n="04" title="Diferenciadores" lead="Por qué construir con Grupo FAC te conviene" />
          <div style={{ marginTop: "var(--space-12)", maxWidth: 860 }}>
            {DIFERENCIADORES.map((d) => (
              <NumberedFeature key={d.number} headingLevel={3} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Proyectos en video (prueba social 1 de 3) ─────────────────── */}
      <section id="proyectos" style={CONTAINER}>
        <SectionHead n="05" title="Proyectos en video" lead="Mira cómo construimos tu próxima nave industrial" />
        <div style={{ marginTop: "var(--space-10)" }}>
          <Pending minHeight={340} label="Carrusel / embed de videos de proyectos" />
        </div>
      </section>

      {/* ── 6. Clientes (prueba social 2 de 3) ───────────────────────────── */}
      <section id="clientes" style={GRID_SHELL}>
        <div style={CONTAINER}>
          <SectionHead
            n="06"
            title="Clientes"
            lead="Empresas que ya construyeron su crecimiento con Grupo FAC"
          />
          <div style={{ marginTop: "var(--space-10)" }}>
            <Pending minHeight={180} label="Logos de clientes a integrar (requiere autorización por escrito de cada marca)" />
          </div>
        </div>
      </section>

      {/* ── 7. Testimonios (prueba social 3 de 3) ────────────────────────── */}
      <section id="testimonios" style={CONTAINER}>
        <SectionHead
          n="07"
          title="Testimonios"
          lead="Lo que dicen las empresas que ya operan en naves construidas por Grupo FAC"
        />
        <DemoNotice>
          Testimonios de relleno para revisar el diseño. Personas y empresas inventadas —
          reemplazar por testimonios reales con autorización antes de publicar.
        </DemoNotice>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gap: "var(--space-6)",
            marginTop: "var(--space-6)",
          }}
        >
          {TESTIMONIOS_DEMO.map((t) => (
            <TestimonialCard key={t.company} {...t} />
          ))}
        </div>
      </section>

      {/* ── 8. Cómo trabajamos ──────────────────────────────────────────── */}
      <section id="proceso" style={GRID_SHELL}>
        <div style={CONTAINER}>
          <SectionHead n="08" title="Nuestro Proceso" lead="De la primera llamada a tu nave lista para operar" />
          <div style={{ marginTop: "var(--space-12)", maxWidth: 760 }}>
            {PROCESO.map((p, i) => (
              <ProcessStep key={p.code} headingLevel={3} last={i === PROCESO.length - 1} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Preguntas frecuentes ─────────────────────────────────────── */}
      <section id="faq" style={CONTAINER}>
        <SectionHead n="09" title="Preguntas frecuentes" />
        <div style={{ marginTop: "var(--space-10)", maxWidth: 860 }}>
          <Accordion headingLevel={3} defaultOpen={-1} items={FAQ} />
          <p
            style={{
              marginTop: "var(--space-6)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--fac-yellow-dim)",
            }}
          >
            Pendiente: las 5 respuestas del FAQ
          </p>
        </div>
      </section>

      <div style={{ ...CONTAINER, paddingBlock: 0 }}>
        <HatchDivider />
      </div>

      {/* ── 10. Contacto (CTA final) ────────────────────────────────────── */}
      <section id="cotizar" style={{ ...GRID_SHELL, scrollMarginTop: "var(--space-20)" }}>
        <div style={CONTAINER}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
              gap: "var(--space-16)",
              alignItems: "start",
            }}
          >
            <SectionHead
              n="10"
              title="Inicia tu construcción de naves industriales"
              lead="Estás a un paso de que tu proyecto empiece a operar"
              body="Cuéntanos tu proyecto y te decimos exactamente cómo lo hacemos realidad, sin vueltas."
            />
            <div
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--line-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-10)",
              }}
            >
              <QuoteForm
                submitLabel="Cotiza tu proyecto"
                services={[
                  { value: "nave", label: "Nave industrial" },
                  { value: "cedis", label: "CEDIS" },
                  { value: "parque", label: "Parque industrial" },
                  { value: "obra-civil", label: "Obra civil e infraestructura" },
                  { value: "llave-en-mano", label: "Proyecto llave en mano" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer
        logo="/logo-fac-white.png"
        blurb="Construcción de naves y parques industriales llave en mano en Monterrey y Nuevo León."
        columns={[
          {
            title: "El proyecto",
            links: [
              { label: "Propuesta de valor", href: "#propuesta" },
              { label: "Alcance del servicio", href: "#alcance" },
              { label: "Diferenciadores", href: "#diferenciadores" },
              { label: "Nuestro proceso", href: "#proceso" },
            ],
          },
          {
            title: "Prueba",
            links: [
              { label: "Proyectos en video", href: "#proyectos" },
              { label: "Clientes", href: "#clientes" },
              { label: "Testimonios", href: "#testimonios" },
              { label: "Preguntas frecuentes", href: "#faq" },
            ],
          },
        ]}
        address="Edificio Punto Aura, Carr. Nacional 4500, Piso 7, Col. Valle Alto, Monterrey, N.L."
        email="contacto@grupofac.com"
        phone="+52 81 8486 1870"
      />
    </>
  );
}
