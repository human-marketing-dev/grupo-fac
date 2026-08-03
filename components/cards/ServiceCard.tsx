"use client";

import * as React from "react";

/**
 * One of the four service lines. Flat card, hairline border, no resting shadow —
 * on hover it lifts 3px, gains --shadow-raised, its yellow top rule grows from
 * 56px to full width, and the photo returns to full colour.
 */
export interface ServiceCardProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "title" | "style"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  /** Lucide icon node, yellow */
  icon?: React.ReactNode;
  image?: string;
  /** Mono index shown opposite the icon, e.g. "01" */
  index?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ServiceCard({
  title,
  description,
  href = "#",
  icon,
  image,
  index,
  style,
  ...rest
}: ServiceCardProps) {
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
        position: "relative",
        background: hover ? "var(--surface-card-hover)" : "var(--surface-card)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        transition: "var(--transition-ui)",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "var(--shadow-raised)" : "none",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          height: "var(--rule-accent)",
          width: hover ? "100%" : "56px",
          background: "var(--fac-yellow)",
          transition: "width var(--dur-slow) var(--ease-mech)",
          zIndex: 2,
        }}
      />
      {image ? (
        <div
          style={{
            position: "relative",
            aspectRatio: "16/10",
            overflow: "hidden",
            background: "var(--surface-inset)",
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
              filter: hover ? "grayscale(0) contrast(1.02)" : "grayscale(.35) contrast(1.05)",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "all var(--dur-slow) var(--ease-mech)",
            }}
          />
          <span style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
        </div>
      ) : null}
      <div
        style={{
          padding: "var(--space-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          flex: 1,
        }}
      >
        {icon || index ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "var(--fac-yellow)",
            }}
          >
            {icon ? <span style={{ display: "flex" }}>{icon}</span> : <span />}
            {index ? (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-caption)",
                  color: "var(--text-muted)",
                }}
              >
                {index}
              </span>
            ) : null}
          </div>
        ) : null}
        <h3
          style={{
            fontSize: "var(--fs-h4)",
            fontWeight: "var(--fw-bold)",
            textTransform: "uppercase",
            letterSpacing: ".02em",
            lineHeight: 1.25,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "var(--fs-body-sm)",
            color: "var(--text-muted)",
            margin: 0,
            flex: 1,
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-caption)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--ls-button)",
            textTransform: "uppercase",
            color: hover ? "var(--fac-yellow-hover)" : "var(--fac-yellow)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginTop: "var(--space-2)",
          }}
        >
          Conoce más
          <span
            style={{
              transform: hover ? "translateX(4px)" : "none",
              transition: "var(--transition-ui)",
            }}
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}
