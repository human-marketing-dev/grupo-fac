"use client";

import * as React from "react";

/** Text field with FAC chrome. Border turns yellow on focus, danger on error. */
export interface InputProps {
  label?: React.ReactNode;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  /** Replaces `hint` and turns the border --state-danger */
  error?: React.ReactNode;
  hint?: React.ReactNode;
  /** Set inside the one bone-inverted block per page */
  invert?: boolean;
  style?: React.CSSProperties;
}

export function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  required,
  error,
  hint,
  invert = false,
  style,
}: InputProps) {
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
      <input
        type={type}
        name={name}
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
          fontFamily: "var(--font-body)",
          fontSize: "var(--fs-body-sm)",
          lineHeight: "var(--lh-ui)",
          outline: "none",
          transition: "var(--transition-ui)",
        }}
      />
      {error || hint ? (
        <span
          style={{
            fontSize: "var(--fs-caption)",
            color: error ? "var(--state-danger)" : "var(--text-muted)",
          }}
        >
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}
