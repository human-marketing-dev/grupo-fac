import type * as React from "react";

/** Hazard-tape section break. Decorative — cap at 1–2 uses per page. */
export interface HatchDividerProps {
  height?: number;
  /** Optional mono label set between the two hatch runs */
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

const HATCH: React.CSSProperties = {
  flex: 1,
  background: "repeating-linear-gradient(135deg,var(--fac-yellow) 0 6px,transparent 6px 14px)",
};

export function HatchDivider({ height = 10, label, style }: HatchDividerProps) {
  return (
    <div
      aria-hidden={label ? undefined : "true"}
      style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", ...style }}
    >
      <span style={{ ...HATCH, height }} />
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            flex: "none",
          }}
        >
          {label}
        </span>
      ) : null}
      <span style={{ ...HATCH, height }} />
    </div>
  );
}
