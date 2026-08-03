import type * as React from "react";

/**
 * Oversized outlined numeral — the service-line index, set as a background mark
 * behind a section heading. Decorative only; position it from `style`, and give
 * the parent `position: relative`.
 */
export interface GhostNumeralProps {
  children?: React.ReactNode;
  /** Font size in px */
  size?: number;
  /** 0–1; multiplied by 6 for the stroke alpha */
  opacity?: number;
  style?: React.CSSProperties;
}

export function GhostNumeral({ children, size = 260, opacity = 0.06, style }: GhostNumeralProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-black)",
        fontSize: size,
        lineHeight: 0.78,
        letterSpacing: "-.04em",
        pointerEvents: "none",
        color: "transparent",
        WebkitTextStroke: `1px rgba(245,191,37,${opacity * 6})`,
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
