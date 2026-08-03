import type { Metadata } from "next";
import {
  Accordion,
  BlogCard,
  Button,
  ClientLogo,
  Eyebrow,
  FeatureList,
  Footer,
  GhostNumeral,
  HatchDivider,
  Input,
  MachineryCard,
  Marquee,
  Navbar,
  NumberedFeature,
  ProcessStep,
  ProjectCard,
  QuoteForm,
  SectionHeading,
  Select,
  ServiceCard,
  Stat,
  Tag,
  Textarea,
} from "@/components";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  description:
    "Especímenes de los 23 componentes y los tokens del sistema de diseño de Grupo FAC.",
};

/**
 * No photography ships with the design system — the source project hot-links
 * jobsite images from grupofac.com, which this repo deliberately does not do.
 * These inline SVG placeholders stand in until real photos land in public/.
 */
function shot(label: string, w = 800, h = 600) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#0d0d0d"/>
    <g stroke="rgba(232,231,229,.07)" stroke-width="1">
      ${Array.from({ length: Math.ceil(w / 48) }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${h}"/>`).join("")}
      ${Array.from({ length: Math.ceil(h / 48) }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${w}" y2="${i * 48}"/>`).join("")}
    </g>
    <rect x="0" y="${h - 4}" width="120" height="4" fill="#f5bf25"/>
    <text x="24" y="${h - 28}" fill="#777777" font-family="monospace" font-size="17" letter-spacing="3">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const NAV = [
  { label: "Nosotros", href: "/nosotros" },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Construcción industrial integral", href: "/construccion-industrial" },
      { label: "Cimentaciones profundas", href: "/cimentaciones-profundas" },
      { label: "Terracerías y pavimentos", href: "/terracerias-y-pavimentos" },
      { label: "Renta de maquinaria pesada", href: "/renta-de-maquinaria" },
    ],
  },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Sistema de diseño", href: "/design-system" },
];

const SECTION: React.CSSProperties = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
  padding: "var(--section-y-tight) var(--gutter)",
};

function Spec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={SECTION}>
      <div style={{ marginBottom: "var(--space-10)" }}>
        <Eyebrow>{title}</Eyebrow>
      </div>
      {children}
    </section>
  );
}

function Swatch({ token, hex }: { token: string; hex: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <div
        style={{
          height: 72,
          background: `var(${token})`,
          border: "1px solid var(--line-hairline)",
          borderRadius: "var(--radius-md)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: ".06em",
          color: "var(--text-secondary)",
        }}
      >
        {token}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
        {hex}
      </span>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Navbar
        logo="/logo-fac-white.png"
        items={NAV}
        activeHref="/design-system"
        phone="+52 81 8486 1870"
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section style={{ ...SECTION, position: "relative", paddingBlock: "var(--space-24)" }}>
        <GhostNumeral size={280} style={{ top: -28, right: 0 }}>
          FAC
        </GhostNumeral>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: 860 }}>
          <Eyebrow>Sistema de diseño</Eyebrow>
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
            Veintitrés componentes, un solo lenguaje
          </h1>
          <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)", maxWidth: 640 }}>
            Grafito oscuro, amarillo de maquinaria usado como marcaje y tipografía mono para todo lo
            técnico. Cada pieza de esta página consume los mismos tokens.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "var(--space-4)",
            }}
          >
            <Button variant="primary" size="lg" icon="→">
              Cotizar proyecto
            </Button>
            <Button variant="secondary" size="lg">
              Ver proyectos
            </Button>
            <Button variant="solid">Solicitar disponibilidad</Button>
            <Button variant="ghost" icon="→">
              Conoce más
            </Button>
            <Button variant="primary" disabled>
              Deshabilitado
            </Button>
          </div>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "center" }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Cimentaciones profundas",
          "Pilotes colados en sitio",
          "Muro Milán",
          "Micropilotes",
          "Terracerías",
          "Pavimentos industriales",
        ]}
      />

      {/* ── Colour ─────────────────────────────────────────────────────── */}
      <Spec title="Color">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
            gap: "var(--space-6)",
          }}
        >
          <Swatch token="--fac-yellow" hex="#F5BF25" />
          <Swatch token="--fac-graphite" hex="#313131" />
          <Swatch token="--fac-bone" hex="#E8E7E5" />
          <Swatch token="--neutral-1000" hex="#0D0D0D" />
          <Swatch token="--neutral-900" hex="#191919" />
          <Swatch token="--neutral-800" hex="#252525" />
          <Swatch token="--neutral-400" hex="#777777" />
          <Swatch token="--neutral-100" hex="#E8E7E5" />
          <Swatch token="--state-danger" hex="#E5484D" />
          <Swatch token="--state-success" hex="#4CC38A" />
        </div>
      </Spec>

      {/* ── Type ───────────────────────────────────────────────────────── */}
      <Spec title="Tipografía">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: ".1em" }}>
              ARCHIVO 800 · --fs-display-2 · UPPERCASE
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-display-2)",
                fontWeight: "var(--fw-black)",
                letterSpacing: "var(--ls-display)",
                lineHeight: "var(--lh-display)",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Cimentaciones profundas
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: ".1em" }}>
              ARCHIVO 700 · --fs-h1 · SENTENCE CASE
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h1)",
                fontWeight: "var(--fw-bold)",
                letterSpacing: "var(--ls-heading)",
                color: "var(--text-primary)",
              }}
            >
              Ingeniería y ejecución con precisión milimétrica
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: ".1em" }}>
              BARLOW 400 · --fs-body-lg
            </div>
            <p style={{ fontSize: "var(--fs-body-lg)", maxWidth: 640, color: "var(--text-secondary)" }}>
              Construimos con precisión, control y una visión enfocada en desempeño. Cada etapa se
              supervisa en obra y se documenta antes de avanzar a la siguiente.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: ".1em" }}>
              IBM PLEX MONO 500 · --fs-eyebrow · .18em
            </div>
            <div className="fac-eyebrow">Sobre el servicio · Alcance · 25°40&apos;N 100°18&apos;O</div>
          </div>
        </div>
      </Spec>

      <HatchDivider label="Componentes" style={{ ...SECTION, paddingBlock: 0 }} />

      {/* ── Section heading, stats, tags ───────────────────────────────── */}
      <Spec title="Encabezado de sección">
        <SectionHeading
          eyebrow="Obra entregada"
          title="Obra entregada, no promesas"
          description="Más de diez años levantando proyectos industriales, logísticos y de infraestructura en el noreste de México."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "var(--space-8)",
            marginTop: "var(--space-12)",
            paddingTop: "var(--space-10)",
            borderTop: "1px solid var(--line-hairline)",
          }}
        >
          <Stat prefix="+" value="10" label="Años de operación" />
          <Stat value="45" suffix=" m" label="Profundidad máxima" />
          <Stat value="98" suffix=" %" label="Disponibilidad de flota" />
          <Stat value="24" suffix=" h" label="Movilización a obra" />
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            marginTop: "var(--space-10)",
          }}
        >
          <Tag>Industrial</Tag>
          <Tag tone="accent">Disponible</Tag>
          <Tag tone="outline">Cimentaciones</Tag>
          <Tag tone="invert">En obra</Tag>
        </div>
      </Spec>

      {/* ── Service cards ──────────────────────────────────────────────── */}
      <Spec title="Líneas de servicio">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(268px,1fr))",
            gap: "var(--space-6)",
          }}
        >
          <ServiceCard
            index="01"
            image={shot("CONSTRUCCION")}
            title="Construcción industrial integral"
            description="Ingeniería, gestión y ejecución llave en mano, con una sola responsable frente a tu operación."
          />
          <ServiceCard
            index="02"
            image={shot("CIMENTACIONES")}
            title="Cimentaciones profundas"
            description="Cimentación que aguanta la carga que tu operación necesita, verificada con pruebas de carga."
          />
          <ServiceCard
            index="03"
            image={shot("TERRACERIAS")}
            title="Terracerías y pavimentos"
            description="Plataforma nivelada y compactada, lista para recibir estructura."
          />
          <ServiceCard
            index="04"
            image={shot("MAQUINARIA")}
            title="Renta de maquinaria pesada"
            description="Flota propia lista para entrar a obra en 24 horas, con operador certificado."
          />
        </div>
      </Spec>

      {/* ── Numbered features + feature list ───────────────────────────── */}
      <Spec title="Diferenciadores">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: ".85fr 1.15fr",
            gap: "var(--space-16)",
            alignItems: "start",
          }}
        >
          <div>
            <NumberedFeature
              number="01"
              title="Control técnico en cada etapa"
              description="Supervisión en obra y bitácora documentada antes de avanzar."
            />
            <NumberedFeature
              number="02"
              title="Flota propia"
              description="Sin intermediarios ni tiempos muertos de subcontratación."
            />
            <NumberedFeature
              number="03"
              title="Un solo responsable"
              description="Ingeniería, ejecución y entrega bajo un mismo contrato."
            />
          </div>
          <div style={{ paddingTop: "var(--space-6)" }}>
            <FeatureList
              columns={2}
              items={[
                "Pilotes colados en sitio",
                "Micropilotes y anclas",
                "Muro Milán / diafragma",
                "Pruebas de carga estática",
                "Compactación controlada",
                "Pavimento industrial",
              ]}
            />
          </div>
        </div>
      </Spec>

      {/* ── Process rail ───────────────────────────────────────────────── */}
      <Spec title="Método">
        <div style={{ maxWidth: 720 }}>
          <ProcessStep
            code="01"
            title="Levantamiento"
            meta="Semana 1"
            description="Visita a sitio, estudio de mecánica de suelos y definición de alcance."
          />
          <ProcessStep
            code="02"
            title="Ingeniería"
            meta="Semanas 2-3"
            description="Diseño estructural, programa de obra y presupuesto cerrado."
          />
          <ProcessStep
            code="03"
            title="Ejecución"
            meta="Según programa"
            description="Movilización de flota, supervisión técnica y control de calidad continuo."
          />
          <ProcessStep
            code="04"
            title="Entrega"
            meta="Cierre"
            description="Pruebas de carga, expediente técnico y acta de entrega."
            last
          />
        </div>
      </Spec>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <Spec title="Proyectos">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))",
            gap: "var(--space-6)",
          }}
        >
          <ProjectCard
            image={shot("RC PARKS", 600, 750)}
            title="RC Parks"
            location="Ciénega de Flores"
            tag={<Tag tone="accent">Industrial</Tag>}
          />
          <ProjectCard image={shot("VOLVO", 600, 750)} title="Volvo" location="Ciénega de Flores" />
          <ProjectCard image={shot("PUNTO DOMO", 600, 750)} title="Punto Domo" location="Santa Catarina" />
          <ProjectCard image={shot("MANARES", 600, 750)} title="Manares" location="Guadalupe" />
        </div>
      </Spec>

      {/* ── Machinery ──────────────────────────────────────────────────── */}
      <Spec title="Flota">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(268px,1fr))",
            gap: "var(--space-6)",
          }}
        >
          <MachineryCard
            image={shot("PILOTEADORA", 800, 600)}
            name="Piloteadora"
            model="BAUER BG 28"
            status={<Tag tone="accent">Disponible</Tag>}
            specs={[
              { label: "Profundidad", value: "45 m" },
              { label: "Diámetro", value: "1.5 m" },
              { label: "Par máximo", value: "281 kNm" },
            ]}
          />
          <MachineryCard
            image={shot("EXCAVADORA", 800, 600)}
            name="Excavadora"
            model="CAT 336"
            status={<Tag>En obra</Tag>}
            specs={[
              { label: "Peso operativo", value: "36 t" },
              { label: "Capacidad", value: "2.1 m³" },
              { label: "Potencia", value: "311 hp" },
            ]}
          />
          <MachineryCard
            image={shot("COMPACTADOR", 800, 600)}
            name="Compactador"
            model="CAT CS11 GC"
            status={<Tag tone="accent">Disponible</Tag>}
            specs={[
              { label: "Peso operativo", value: "11.6 t" },
              { label: "Ancho de rodillo", value: "2.13 m" },
              { label: "Frecuencia", value: "31.9 Hz" },
            ]}
          />
        </div>
      </Spec>

      {/* ── Clients ────────────────────────────────────────────────────── */}
      <Spec title="Clientes">
        <p
          style={{
            fontSize: "var(--fs-caption)",
            color: "var(--text-muted)",
            marginBottom: "var(--space-6)",
          }}
        >
          Marcas de terceros: el sistema no incluye archivos de logo. Sustituye los `src` cuando
          tengas la autorización por escrito.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "var(--space-4)",
          }}
        >
          {["Volvo", "Brembo", "Hofusan", "Alianza", "Hermosillo"].map((n) => (
            <ClientLogo key={n} name={n} src={shot(n.toUpperCase(), 320, 120)} />
          ))}
        </div>
      </Spec>

      {/* ── Blog ───────────────────────────────────────────────────────── */}
      <Spec title="Blog">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "var(--space-8)",
          }}
        >
          <BlogCard
            image={shot("PILOTES", 800, 500)}
            category="Cimentaciones"
            date="12 Mar 2026"
            readTime="6 min"
            title="Cuándo conviene un pilote colado en sitio"
            excerpt="Tres condiciones de suelo que definen la elección antes de mover una sola máquina."
          />
          <BlogCard
            image={shot("TERRACERIAS", 800, 500)}
            category="Terracerías"
            date="28 Feb 2026"
            readTime="4 min"
            title="Compactación controlada: qué se mide y por qué"
            excerpt="El grado de compactación decide si la plataforma aguanta la estructura que va encima."
          />
        </div>
      </Spec>

      {/* ── Bone invert block — one per page ───────────────────────────── */}
      <section style={{ background: "var(--surface-invert)" }}>
        <div style={SECTION}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.05fr",
              gap: "var(--space-16)",
              alignItems: "start",
            }}
          >
            <SectionHeading
              invert
              size="sm"
              eyebrow="Alcance"
              title="Todo lo que entra en el contrato"
              description="Una sola superficie clara por página, para reiniciar el ojo. Aquí es donde va el alcance del servicio."
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              <FeatureList
                invert
                columns={2}
                items={[
                  "Estudio de mecánica de suelos",
                  "Diseño estructural",
                  "Programa de obra",
                  "Movilización de flota",
                  "Supervisión técnica",
                  "Expediente de entrega",
                ]}
              />
              <Accordion
                invert
                items={[
                  {
                    question: "¿Cuánto tarda la movilización?",
                    answer:
                      "La flota es propia. En el área metropolitana de Monterrey entramos a obra en 24 horas desde la firma.",
                  },
                  {
                    question: "¿Qué profundidad alcanzan los pilotes?",
                    answer:
                      "Hasta 45 metros con la piloteadora BG 28, en diámetros de hasta 1.5 metros.",
                  },
                  {
                    question: "¿Entregan pruebas de carga?",
                    answer:
                      "Sí. La prueba de carga estática y su reporte forman parte del expediente de entrega.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Forms + hatch contact block ────────────────────────────────── */}
      <section style={{ position: "relative", background: "var(--neutral-950)" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--texture-hatch)" }} />
        <div style={{ ...SECTION, position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.05fr",
              gap: "var(--space-16)",
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              <SectionHeading
                size="sm"
                eyebrow="Campos"
                title="¿Listo para iniciar tu proyecto industrial?"
                description="Los campos individuales, con sus estados de foco, ayuda y error."
              />
              <Input label="Nombre" placeholder="Nombre y apellido" required />
              <Input label="Correo" type="email" placeholder="nombre@empresa.com" hint="Usamos el correo solo para responder la cotización." />
              <Input label="Teléfono" type="tel" placeholder="+52 81 0000 0000" error="Ingresa un teléfono a 10 dígitos." />
              <Select
                label="Servicio de interés"
                options={[
                  { value: "cimentaciones", label: "Cimentaciones profundas" },
                  { value: "terracerias", label: "Terracerías y pavimentos" },
                ]}
              />
              <Textarea label="Alcance del proyecto" rows={3} placeholder="Ubicación, superficie, fechas estimadas" />
            </div>
            <div
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--line-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-10)",
              }}
            >
              <div style={{ marginBottom: "var(--space-8)" }}>
                <Eyebrow>Cotizar proyecto</Eyebrow>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <Footer
        logo="/logo-fac-white.png"
        blurb="Construcción industrial, cimentaciones profundas y renta de maquinaria pesada en el noreste de México."
        columns={[
          {
            title: "Servicios",
            links: [
              { label: "Construcción industrial", href: "/construccion-industrial" },
              { label: "Cimentaciones profundas", href: "/cimentaciones-profundas" },
              { label: "Terracerías y pavimentos", href: "/terracerias-y-pavimentos" },
              { label: "Renta de maquinaria", href: "/renta-de-maquinaria" },
            ],
          },
          {
            title: "Empresa",
            links: [
              { label: "Nosotros", href: "/nosotros" },
              { label: "Proyectos", href: "/proyectos" },
              { label: "Blog", href: "/blog" },
            ],
          },
        ]}
        address="Edificio Punto Aura, Carr. Nacional 4500, Piso 7, Col. Valle Alto, Monterrey, N.L."
        email="contacto@grupofac.com"
        phone="+52 81 8486 1870"
        hours="Lunes a viernes, 8:00 a 18:00 h"
        social={[
          { label: "LinkedIn", href: "#" },
          { label: "Facebook", href: "#" },
        ]}
      />
    </>
  );
}
