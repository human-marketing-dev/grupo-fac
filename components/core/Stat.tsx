import type * as React from "react";

/**
 * A defensible number, given first-class form. Prefix/suffix carry the yellow;
 * the mono label sits underneath. Never a number you cannot defend.
 */
export interface StatProps {
  value?: React.ReactNode;
  /** Rendered in yellow before the value — e.g. "+" */
  prefix?: React.ReactNode;
  /** Rendered in yellow after the value — e.g. "m", "%" */
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  style?: React.CSSProperties;
}

export function Stat({ value, prefix, suffix, label, align = "left", invert = false, style }: StatProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", textAlign: align, ...style }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-stat)",
          fontWeight: "var(--fw-black)",
          lineHeight: "var(--lh-tight)",
          letterSpacing: "var(--ls-display)",
          color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        {prefix ? <span style={{ color: "var(--text-accent)" }}>{prefix}</span> : null}
        {value}
        {suffix ? <span style={{ color: "var(--text-accent)" }}>{suffix}</span> : null}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-eyebrow)",
          letterSpacing: "var(--ls-eyebrow)",
          textTransform: "uppercase",
          color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
