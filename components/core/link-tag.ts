import type * as React from "react";
import NextLink from "next/link";

/**
 * The source design system is framework-agnostic and renders every link as a
 * plain <a>. In this app, in-app routes should go through next/link so they
 * navigate client-side (and so @next/next/no-html-link-for-pages passes).
 * next/link renders an <a>, so styling is identical either way.
 */
export function isInternalHref(href?: string): boolean {
  return !!href && href.startsWith("/") && !href.startsWith("//");
}

/**
 * Element type to render for a given href: next/link for in-app paths, "a" for
 * everything else (mailto:, tel:, #anchors, external URLs).
 *
 * Both branches are stable module-level references — this never constructs a
 * component, despite the shape looking that way to react-hooks lint rules.
 */
export function linkTag(href?: string): React.ElementType {
  return isInternalHref(href) ? NextLink : "a";
}
