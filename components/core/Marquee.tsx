import type * as React from "react";

/**
 * Infinite mono ticker strip — capability keywords or client names, used as a
 * band between two dark sections. Cap at 1–2 uses per page.
 *
 * The `facMarquee` keyframes live in app/globals.css (the design system injects
 * a <style> tag per instance; hoisting it avoids duplicating the rule per band
 * and keeps this a server component).
 */
export interface MarqueeProps {
  items?: React.ReactNode[];
  /** Seconds for one full loop. Higher = slower. */
  speed?: number;
  separator?: React.ReactNode;
  /** accent = yellow band with graphite type; dark = ink band with bone type */
  tone?: "accent" | "dark";
  style?: React.CSSProperties;
}

export function Marquee({
  items = [],
  speed = 34,
  separator = "/",
  tone = "accent",
  style,
}: MarqueeProps) {
  const run = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        overflow: "hidden",
        borderBlock: "1px solid var(--line-hairline)",
        background: tone === "accent" ? "var(--fac-yellow)" : "var(--neutral-1000)",
        paddingBlock: "var(--space-3)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "var(--space-8)",
          animation: `facMarquee ${speed}s linear infinite`,
        }}
      >
        {run.map((it, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-8)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-caption)",
              fontWeight: "var(--fw-medium)",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: tone === "accent" ? "var(--text-on-accent)" : "var(--text-secondary)",
            }}
          >
            {it}
            <span style={{ opacity: 0.45 }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
