"use client";

import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Native select with FAC chrome — used for service line and machinery type in
 * the quote form. The ▼ caret is one of three intentional glyph exceptions to
 * the no-dingbats rule.
 */
export interface SelectProps {
  label?: React.ReactNode;
  options?: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  invert?: boolean;
  style?: React.CSSProperties;
}

export function Select({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder = "Selecciona una opción",
  required,
  invert = false,
  style,
}: SelectProps) {
  const [focus, setFocus] = React.useState(false);
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
      <div style={{ position: "relative" }}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            padding: "13px 40px 13px 14px",
            appearance: "none",
            background: invert ? "var(--fac-white)" : "var(--surface-inset)",
            color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
            border: `1px solid ${
              focus ? "var(--fac-yellow)" : invert ? "var(--line-invert)" : "var(--line-strong)"
            }`,
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-body-sm)",
            outline: "none",
            transition: "var(--transition-ui)",
            cursor: "pointer",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--fac-yellow)",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        >
          ▼
        </span>
      </div>
    </label>
  );
}
