"use client";

import * as React from "react";

/**
 * Client logo wall cell. Marks rest at grayscale(1) opacity(.55) and return to
 * full colour on hover.
 *
 * No client logo files ship with the design system — they are third-party marks
 * and were not supplied. Pass a `src` you have the right to use.
 */
export interface ClientLogoProps {
  src?: string;
  name?: string;
  style?: React.CSSProperties;
}

export function ClientLogo({ src, name, style }: ClientLogoProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={name}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-5)",
        minHeight: 96,
        background: "var(--surface-raised)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--radius-md)",
        transition: "var(--transition-ui)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- design-system primitive: src is an arbitrary caller-supplied URL, not a build-time asset */}
      <img
        src={src}
        alt={name}
        style={{
          maxWidth: "100%",
          maxHeight: 44,
          objectFit: "contain",
          display: "block",
          filter: hover ? "grayscale(0) opacity(1)" : "grayscale(1) opacity(.55)",
          transition: "filter var(--dur-base) var(--ease-mech)",
        }}
      />
    </div>
  );
}
