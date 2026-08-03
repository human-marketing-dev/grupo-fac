import type * as React from "react";

/**
 * Mono uppercase label with its 28x2 yellow rule — the system's most repeated
 * gesture. Opens almost every section.
 */
export interface EyebrowProps {
  children?: React.ReactNode;
  /** The 28x2 rule to the left of the label. On by default. */
  rule?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

export function Eyebrow({
  children,
  rule = true,
  color = "var(--text-accent)",
  style,
}: EyebrowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", ...style }}>
      {rule ? <span style={{ width: 28, height: 2, background: color, flex: "none" }} /> : null}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-eyebrow)",
          fontWeight: "var(--fw-medium)",
          letterSpacing: "var(--ls-eyebrow)",
          textTransform: "uppercase",
          color,
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </div>
  );
}
