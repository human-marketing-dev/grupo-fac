import type * as React from "react";
import { Eyebrow } from "./Eyebrow";

/** Eyebrow + headline + lead paragraph — the standard section opener. */
export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Set on the one bone-inverted block per page. */
  invert?: boolean;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const SIZES: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  sm: "var(--fs-h2)",
  md: "var(--fs-h1)",
  lg: "var(--fs-display-2)",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  size = "md",
  style,
}: SectionHeadingProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        maxWidth: 720,
        ...style,
      }}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2
          style={{
            fontSize: SIZES[size],
            lineHeight: "var(--lh-heading)",
            letterSpacing: "var(--ls-heading)",
            fontWeight: "var(--fw-bold)",
            color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
            margin: 0,
          }}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          style={{
            fontSize: "var(--fs-body-lg)",
            lineHeight: "var(--lh-body)",
            color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
            margin: 0,
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
