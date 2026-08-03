import type * as React from "react";

/** Mono chip for project category and fleet availability. 2px radius — never a pill. */
export interface TagProps {
  children?: React.ReactNode;
  tone?: "neutral" | "accent" | "outline" | "invert";
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<TagProps["tone"]>, React.CSSProperties> = {
  neutral: {
    background: "rgba(232,231,229,.07)",
    color: "var(--text-secondary)",
    border: "1px solid var(--line-hairline)",
  },
  accent: {
    background: "var(--fac-yellow)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--fac-yellow)",
  },
  outline: {
    background: "transparent",
    color: "var(--text-accent)",
    border: "1px solid rgba(245,191,37,.45)",
  },
  invert: {
    background: "var(--neutral-700)",
    color: "var(--fac-white)",
    border: "1px solid var(--neutral-700)",
  },
};

export function Tag({ children, tone = "neutral", style }: TagProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        fontWeight: "var(--fw-medium)",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        lineHeight: 1.2,
        borderRadius: "var(--radius-xs)",
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
