"use client";

import * as React from "react";
import { Heading, type HeadingLevel } from "./Heading";

/** Numbered differentiator row. The mono index turns yellow on hover. */
export interface NumberedFeatureProps {
  /** Zero-padded index, e.g. "01" */
  number?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  invert?: boolean;
  /** Document outline level for the title. Defaults to 4. */
  headingLevel?: HeadingLevel;
  style?: React.CSSProperties;
}

export function NumberedFeature({
  number,
  title,
  description,
  invert = false,
  headingLevel = 4,
  style,
}: NumberedFeatureProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "var(--space-5)",
        alignItems: "start",
        paddingBlock: "var(--space-6)",
        borderTop: `1px solid ${invert ? "var(--line-invert)" : "var(--line-hairline)"}`,
        transition: "var(--transition-ui)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-caption)",
          fontWeight: "var(--fw-semibold)",
          letterSpacing: ".06em",
          color: hover ? "var(--fac-yellow)" : "var(--text-muted)",
          paddingTop: 3,
          transition: "var(--transition-ui)",
        }}
      >
        {number}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <Heading
          level={headingLevel}
          style={{
            fontSize: "var(--fs-h4)",
            fontWeight: "var(--fw-bold)",
            textTransform: "uppercase",
            letterSpacing: ".01em",
            margin: 0,
            color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
          }}
        >
          {title}
        </Heading>
        {description ? (
          <p
            style={{
              fontSize: "var(--fs-body-sm)",
              color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
              margin: 0,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
