"use client";

import * as React from "react";
import { Heading, type HeadingLevel } from "./Heading";

/**
 * One rung of the method rail on service pages — where "supervisión técnica en
 * cada etapa" becomes legible instead of claimed.
 */
export interface ProcessStepProps {
  /** Mono step code, e.g. "01" or "E1" */
  code?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Mono aside next to the title — duration, deliverable */
  meta?: React.ReactNode;
  /** Drops the connector line and the trailing space */
  last?: boolean;
  invert?: boolean;
  /** Document outline level for the title. Defaults to 4. */
  headingLevel?: HeadingLevel;
  style?: React.CSSProperties;
}

export function ProcessStep({
  code,
  title,
  description,
  meta,
  last = false,
  invert = false,
  headingLevel = 4,
  style,
}: ProcessStepProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--space-6)", ...style }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span
          style={{
            width: 52,
            height: 52,
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-caption)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: ".06em",
            background: hover ? "var(--fac-yellow)" : "transparent",
            color: hover ? "var(--text-on-accent)" : "var(--fac-yellow)",
            border: `1px solid ${
              hover ? "var(--fac-yellow)" : invert ? "rgba(49,49,49,.22)" : "var(--line-strong)"
            }`,
            borderRadius: "var(--radius-sm)",
            transition: "var(--transition-ui)",
          }}
        >
          {code}
        </span>
        {!last ? (
          <span
            style={{
              width: 1,
              flex: 1,
              minHeight: 28,
              background: invert ? "rgba(49,49,49,.16)" : "var(--line-hairline)",
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          paddingBottom: last ? 0 : "var(--space-10)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Heading
            level={headingLevel}
            style={{
              fontSize: "var(--fs-h4)",
              fontWeight: "var(--fw-bold)",
              textTransform: "uppercase",
              letterSpacing: ".02em",
              margin: 0,
              color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
            }}
          >
            {title}
          </Heading>
          {meta ? (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {meta}
            </span>
          ) : null}
        </div>
        {description ? (
          <p
            style={{
              fontSize: "var(--fs-body-sm)",
              margin: 0,
              maxWidth: 560,
              color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
