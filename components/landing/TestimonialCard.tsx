"use client";

import * as React from "react";

/**
 * Testimonio para el bloque 7 de prueba social.
 *
 * El sistema de diseño no trae componente de testimonio (el sitio original no
 * los tiene), así que esto se arma con los tokens: tarjeta plana, filete
 * amarillo que crece en hover, atribución en mono. Sin estrellas ni dingbats —
 * el sistema los prohíbe explícitamente.
 */
export interface TestimonialCardProps {
  quote: React.ReactNode;
  /** Persona que da el testimonio */
  name: React.ReactNode;
  /** Puesto */
  role: React.ReactNode;
  /** Empresa y municipio, en mono */
  company: React.ReactNode;
}

export function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
        margin: 0,
        padding: "var(--space-8)",
        background: "var(--surface-card)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        transition: "var(--transition-ui)",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "var(--shadow-raised)" : "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          height: "var(--rule-accent)",
          width: hover ? "100%" : "56px",
          background: "var(--fac-yellow)",
          transition: "width var(--dur-slow) var(--ease-mech)",
        }}
      />
      <blockquote
        style={{
          margin: 0,
          fontSize: "var(--fs-body-lg)",
          lineHeight: "var(--lh-body)",
          color: "var(--text-secondary)",
          flex: 1,
        }}
      >
        {quote}
      </blockquote>
      <figcaption
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingTop: "var(--space-5)",
          borderTop: "1px solid var(--line-hairline)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-body-sm)",
            fontWeight: "var(--fw-bold)",
            textTransform: "uppercase",
            letterSpacing: ".02em",
            color: "var(--text-primary)",
          }}
        >
          {name}
        </span>
        <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)" }}>{role}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--fac-yellow)",
            marginTop: 2,
          }}
        >
          {company}
        </span>
      </figcaption>
    </figure>
  );
}
