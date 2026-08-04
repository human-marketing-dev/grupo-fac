import * as React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
}

/**
 * Renders h1–h6 from a numeric level.
 *
 * Components in this system pick a default level that suits their usual place
 * in a page, but document outline is a page-level concern — a landing whose
 * copy spec calls for H3 needs to override it. Kept as a module-level
 * component so no element type is constructed during render.
 */
export function Heading({ level, ...rest }: HeadingProps) {
  return React.createElement(`h${level}`, rest);
}
