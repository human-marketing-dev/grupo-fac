import Image from "next/image";
import { Button, Eyebrow, HatchDivider } from "@/components";

/**
 * Brand holding page. The marketing site itself is not built yet — the design
 * system landed first. See /design-system for the component specimens.
 */
export default function Home() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "var(--space-10)",
        maxWidth: "var(--container-max)",
        width: "100%",
        margin: "0 auto",
        padding: "var(--space-24) var(--gutter)",
      }}
    >
      <Image
        src="/logo-fac-white.png"
        alt="Grupo FAC"
        // Intrinsic ratio of the trimmed wordmark is 1356x758 (1.789:1); these
        // are the display dimensions so next/image requests a 172px rendition
        // rather than a 3840px one.
        width={172}
        height={96}
        priority
        style={{ width: 172, height: "auto" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: 720 }}>
        <Eyebrow>Monterrey, N.L.</Eyebrow>
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
          Expertos en cimentaciones profundas
        </h1>
        <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)" }}>
          Construcción industrial, cimentaciones profundas, terracerías y renta de maquinaria pesada
          en el noreste de México. Sitio en construcción.
        </p>
      </div>
      <HatchDivider style={{ maxWidth: 720 }} />
      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <Button href="mailto:contacto@grupofac.com" variant="primary" icon="→">
          Cotizar proyecto
        </Button>
        <Button href="/design-system" variant="secondary">
          Sistema de diseño
        </Button>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--neutral-500)", letterSpacing: ".08em", textTransform: "uppercase" }}>
        contacto@grupofac.com · +52 81 8486 1870
      </p>
    </main>
  );
}
