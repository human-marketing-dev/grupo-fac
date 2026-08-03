"use client";

import * as React from "react";

/** Multi-line field with FAC chrome. Vertical resize only. */
export interface TextareaProps {
  label?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  rows?: number;
  required?: boolean;
  error?: React.ReactNode;
  invert?: boolean;
  style?: React.CSSProperties;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  name,
  rows = 4,
  required,
  error,
  invert = false,
  style,
}: TextareaProps) {
  const [focus, setFocus] = React.useState(false);
  const border = error
    ? "var(--state-danger)"
    : focus
      ? "var(--fac-yellow)"
      : invert
        ? "var(--line-invert)"
        : "var(--line-strong)";

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-eyebrow)",
            letterSpacing: "var(--ls-eyebrow)",
            textTransform: "uppercase",
            color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
          }}
        >
          {label}
          {required ? <span style={{ color: "var(--fac-yellow)" }}> *</span> : null}
        </span>
      ) : null}
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={error ? true : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          padding: "13px 14px",
          background: invert ? "var(--fac-white)" : "var(--surface-inset)",
          color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
          border: `1px solid ${border}`,
          borderRadius: "var(--radius-sm)",
          resize: "vertical",
          fontFamily: "var(--font-body)",
          fontSize: "var(--fs-body-sm)",
          lineHeight: "var(--lh-body)",
          outline: "none",
          transition: "var(--transition-ui)",
        }}
      />
      {error ? (
        <span style={{ fontSize: "var(--fs-caption)", color: "var(--state-danger)" }}>{error}</span>
      ) : null}
    </label>
  );
}
