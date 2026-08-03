"use client";

import * as React from "react";

/**
 * Delivered-work tile. Proof convention: always NAME + municipality — never a
 * client without the place, never a place without the client.
 *
 * No border-lift on hover; the yellow underline grows 24 → 56px instead.
 */
export interface ProjectCardProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "title" | "style"> {
  image?: string;
  /** Takes precedence over `image` — autoplaying, muted, looping reel */
  video?: string;
  title?: React.ReactNode;
  /** Municipality, e.g. "Ciénega de Flores" */
  location?: React.ReactNode;
  /** A <Tag> node, pinned top-left */
  tag?: React.ReactNode;
  /** CSS aspect-ratio; the gallery mixes ratios deliberately */
  ratio?: string;
  href?: string;
  style?: React.CSSProperties;
}

export function ProjectCard({
  image,
  video,
  title,
  location,
  tag,
  ratio = "4/5",
  href = "#",
  style,
  ...rest
}: ProjectCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      {...rest}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "block",
        aspectRatio: ratio,
        overflow: "hidden",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        background: "var(--surface-inset)",
        border: "1px solid var(--line-hairline)",
        transition: "var(--transition-ui)",
        ...style,
      }}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- design-system primitive: src is an arbitrary caller-supplied URL, not a build-time asset
        <img
          src={image}
          alt={typeof title === "string" ? title : ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hover ? "scale(1.05)" : "scale(1)",
            filter: hover ? "saturate(1.05)" : "saturate(.85)",
            transition: "all var(--dur-slow) var(--ease-mech)",
          }}
        />
      )}
      <span style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
      {tag ? (
        <span style={{ position: "absolute", top: "var(--space-4)", left: "var(--space-4)" }}>{tag}</span>
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span
          style={{
            width: hover ? 56 : 24,
            height: 2,
            background: "var(--fac-yellow)",
            marginBottom: "var(--space-3)",
            transition: "width var(--dur-base) var(--ease-mech)",
          }}
        />
        <h3
          style={{
            fontSize: "var(--fs-h3)",
            fontWeight: "var(--fw-bold)",
            textTransform: "uppercase",
            letterSpacing: ".01em",
            color: "var(--fac-white)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-caption)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--neutral-200)",
          }}
        >
          {location}
        </span>
      </div>
    </a>
  );
}
