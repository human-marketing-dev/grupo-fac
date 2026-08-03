"use client";

import * as React from "react";
import Link from "next/link";
import { isInternalHref } from "./link-tag";

type PolymorphicAttributes = React.ButtonHTMLAttributes<HTMLElement> &
  Omit<React.AnchorHTMLAttributes<HTMLElement>, "type">;

/**
 * Primary call-to-action control. Uppercase, near-square, machinery-yellow.
 * One `primary` per view — yellow is a marking, not a fill.
 */
export type ButtonProps = PolymorphicAttributes & {
  children?: React.ReactNode;
  /**
   * primary = yellow fill (one per view); secondary = hairline outline on dark;
   * solid = bone fill on dark; ghost = inline text link
   */
  variant?: "primary" | "secondary" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Lucide icon node, 16–18px */
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button> */
  href?: string;
  style?: React.CSSProperties;
};

const SIZES: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
  sm: { padding: "9px 16px", fontSize: "var(--fs-caption)" },
  md: { padding: "13px 24px", fontSize: "var(--fs-body-sm)" },
  lg: { padding: "17px 34px", fontSize: "var(--fs-body)" },
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: {
    background: "var(--fac-yellow)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--fac-yellow)",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--line-strong)",
  },
  solid: {
    background: "var(--neutral-100)",
    color: "var(--text-on-invert)",
    border: "1px solid var(--neutral-100)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-accent)",
    border: "1px solid transparent",
    padding: "0",
  },
};

const HOVER: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: { background: "var(--fac-yellow-hover)", borderColor: "var(--fac-yellow-hover)" },
  secondary: {
    background: "rgba(232,231,229,.06)",
    borderColor: "var(--fac-yellow)",
    color: "var(--fac-yellow)",
  },
  solid: { background: "var(--fac-white)" },
  ghost: { color: "var(--fac-yellow-hover)" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const base: React.CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "var(--ls-button)",
    textTransform: "uppercase",
    lineHeight: "var(--lh-ui)",
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition: "var(--transition-ui)",
    whiteSpace: "nowrap",
    opacity: disabled ? 0.38 : 1,
    transform: press && !disabled ? "translateY(1px)" : "none",
    ...SIZES[size],
    ...VARIANTS[variant],
    ...(hover && !disabled ? HOVER[variant] : null),
    ...style,
  };

  const shared = {
    onClick: disabled ? undefined : onClick,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    ...rest,
  };

  const inner = (
    <>
      {icon && iconPosition === "left" ? <span style={{ display: "flex" }}>{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? (
        <span
          style={{
            display: "flex",
            transform: hover ? "translateX(3px)" : "none",
            transition: "var(--transition-ui)",
          }}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <button disabled={disabled} {...shared}>
        {inner}
      </button>
    );
  }

  // An <a> cannot be natively disabled — mark it for assistive tech instead.
  const anchorProps = { href, "aria-disabled": disabled || undefined, ...shared };

  return isInternalHref(href) ? (
    <Link {...anchorProps} href={href}>
      {inner}
    </Link>
  ) : (
    <a {...anchorProps}>{inner}</a>
  );
}
