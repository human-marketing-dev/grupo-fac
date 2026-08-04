"use client";

import * as React from "react";
import { Heading, type HeadingLevel } from "../core/Heading";

/**
 * Non-linking service card for the "Alcance del servicio" block.
 *
 * ServiceCard is the design system's equivalent, but it is an <a> with a
 * "Conoce más" affordance — these six items describe scope and don't navigate
 * anywhere, so this reuses the card chrome without the link.
 */
export interface ScopeCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  /** Mono index shown in the corner, e.g. "01" */
  index?: React.ReactNode;
  invert?: boolean;
  headingLevel?: HeadingLevel;
}

export function ScopeCard({
  title,
  description,
  index,
  invert = false,
  headingLevel = 3,
}: ScopeCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        padding: "var(--space-8)",
        background: invert ? "var(--surface-invert-card)" : "var(--surface-card)",
        border: `1px solid ${invert ? "var(--line-invert)" : "var(--line-hairline)"}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        transition: "var(--transition-ui)",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover && !invert ? "var(--shadow-raised)" : "none",
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
      {index ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-caption)",
            letterSpacing: ".06em",
            color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
          }}
        >
          {index}
        </span>
      ) : null}
      <Heading
        level={headingLevel}
        style={{
          fontSize: "var(--fs-h4)",
          fontWeight: "var(--fw-bold)",
          textTransform: "uppercase",
          letterSpacing: ".02em",
          lineHeight: 1.25,
          margin: 0,
          color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
        }}
      >
        {title}
      </Heading>
      <p
        style={{
          fontSize: "var(--fs-body-sm)",
          lineHeight: "var(--lh-body)",
          margin: 0,
          color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
        }}
      >
        {description}
      </p>
    </div>
  );
}
