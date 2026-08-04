import type * as React from "react";

/**
 * Visible stand-in for a `[placeholder]` in the copy document — an asset or
 * figure the client still owes. Deliberately loud: hazard hatch and a mono
 * label, so nothing ships to production while still marked PENDIENTE.
 *
 * Grep for `<Pending` to list everything still outstanding.
 */
export interface PendingProps {
  /** What is missing, in the client's words */
  label: string;
  /** Approximate height of the eventual asset */
  minHeight?: number;
  children?: React.ReactNode;
}

export function Pending({ label, minHeight = 220, children }: PendingProps) {
  return (
    <div
      style={{
        position: "relative",
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        padding: "var(--space-8)",
        textAlign: "center",
        border: "1px dashed var(--line-strong)",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-inset)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--texture-hatch)",
          borderRadius: "var(--radius-md)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "var(--fac-yellow)",
        }}
      >
        Pendiente
      </span>
      <span
        style={{
          position: "relative",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-caption)",
          lineHeight: "var(--lh-body)",
          color: "var(--text-muted)",
          maxWidth: 460,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
