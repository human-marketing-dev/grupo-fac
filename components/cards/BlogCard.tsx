"use client";

import * as React from "react";

/** Blog teaser: image, mono meta row, headline that turns yellow on hover. */
export interface BlogCardProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "title" | "style"> {
  image?: string;
  category?: React.ReactNode;
  title?: React.ReactNode;
  excerpt?: React.ReactNode;
  date?: React.ReactNode;
  readTime?: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
}

export function BlogCard({
  image,
  category,
  title,
  excerpt,
  date,
  readTime,
  href = "#",
  style,
  ...rest
}: BlogCardProps) {
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
        gap: "var(--space-5)",
        textDecoration: "none",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
          background: "var(--surface-inset)",
          border: "1px solid var(--line-hairline)",
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
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {category ? <span style={{ color: "var(--fac-yellow)" }}>{category}</span> : null}
          {date ? <span>{date}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
        </div>
        <h3
          style={{
            fontSize: "var(--fs-h3)",
            fontWeight: "var(--fw-bold)",
            lineHeight: 1.18,
            margin: 0,
            color: hover ? "var(--fac-yellow)" : "var(--text-primary)",
            transition: "var(--transition-ui)",
          }}
        >
          {title}
        </h3>
        {excerpt ? (
          <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", margin: 0 }}>
            {excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}
