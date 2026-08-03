"use client";

import * as React from "react";

export interface MachinerySpec {
  label: React.ReactNode;
  value: React.ReactNode;
}

/**
 * Fleet unit for the machinery-rental catalogue: photo, unit name, model code,
 * mono spec table. The one place the mono type does real work.
 */
export interface MachineryCardProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "name" | "style"> {
  image?: string;
  name?: React.ReactNode;
  /** Manufacturer model code, mono */
  model?: React.ReactNode;
  specs?: MachinerySpec[];
  /** A <Tag> node — availability badge, top-right of the photo */
  status?: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
}

export function MachineryCard({
  image,
  name,
  model,
  specs = [],
  status,
  href = "#",
  style,
  ...rest
}: MachineryCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      {...rest}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: "var(--surface-card)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        transition: "var(--transition-ui)",
        borderColor: hover ? "var(--line-strong)" : "var(--line-hairline)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          background: "var(--surface-inset)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- design-system primitive: src is an arbitrary caller-supplied URL, not a build-time asset */}
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform var(--dur-slow) var(--ease-mech)",
          }}
        />
        {status ? (
          <span style={{ position: "absolute", top: "var(--space-3)", right: "var(--space-3)" }}>
            {status}
          </span>
        ) : null}
      </div>
      <div
        style={{
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h3
            style={{
              fontSize: "var(--fs-h4)",
              fontWeight: "var(--fw-bold)",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: ".02em",
            }}
          >
            {name}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-caption)",
              color: "var(--text-muted)",
              letterSpacing: ".06em",
            }}
          >
            {model}
          </span>
        </div>
        {specs.length ? (
          <dl style={{ margin: 0, display: "grid", gap: 0 }}>
            {specs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  padding: "9px 0",
                  borderTop: "1px solid var(--line-hairline)",
                }}
              >
                <dt style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)" }}>{s.label}</dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-caption)",
                    color: "var(--text-primary)",
                    fontWeight: "var(--fw-medium)",
                  }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </a>
  );
}
