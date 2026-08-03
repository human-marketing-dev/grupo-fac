import type * as React from "react";

/**
 * Capability list. The marker is a yellow right-triangle drawn with clip-path —
 * an intentional typographic exception, not an icon.
 */
export interface FeatureListProps {
  items?: React.ReactNode[];
  columns?: number;
  invert?: boolean;
  style?: React.CSSProperties;
}

export function FeatureList({ items = [], columns = 1, invert = false, style }: FeatureListProps) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
        gap: "var(--space-4) var(--space-8)",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "var(--space-3)",
            alignItems: "start",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              marginTop: 9,
              flex: "none",
              background: "var(--fac-yellow)",
              clipPath: "polygon(0 0,100% 0,100% 100%)",
            }}
          />
          <span
            style={{
              fontSize: "var(--fs-body-sm)",
              lineHeight: "var(--lh-body)",
              color: invert ? "var(--text-on-invert)" : "var(--text-secondary)",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
