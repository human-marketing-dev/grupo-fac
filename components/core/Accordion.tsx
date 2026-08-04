"use client";

import * as React from "react";
import { Heading, type HeadingLevel } from "./Heading";

export interface AccordionItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

/**
 * Technical FAQ on service pages, written in the client's voice to answer the
 * objections that precede a quote. One panel open at a time.
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Index open on mount; -1 for all closed */
  defaultOpen?: number;
  invert?: boolean;
  /**
   * Document outline level for each question. Defaults to 3 — the trigger is
   * wrapped in a heading per the WAI-ARIA accordion pattern, which also makes
   * FAQ questions crawlable.
   */
  headingLevel?: HeadingLevel;
  style?: React.CSSProperties;
}

export function Accordion({
  items = [],
  defaultOpen = 0,
  invert = false,
  headingLevel = 3,
  style,
}: AccordionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const uid = React.useId();
  const line = invert ? "rgba(49,49,49,.16)" : "var(--line-hairline)";

  return (
    <div style={{ borderTop: `1px solid ${line}`, ...style }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;
        return (
          <div key={i} style={{ borderBottom: `1px solid ${line}` }}>
            <Heading
              level={headingLevel}
              style={{
                margin: 0,
                font: "inherit",
                color: "inherit",
                letterSpacing: "normal",
                lineHeight: "inherit",
              }}
            >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-5)",
                padding: "var(--space-6) 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
              }}
            >
              {/* Positional index — conveyed by list order, so keep it out of
                  the heading's accessible name. */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: ".1em",
                  color: isOpen ? "var(--fac-yellow)" : "var(--text-muted)",
                  flex: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h4)",
                  fontWeight: "var(--fw-semibold)",
                  letterSpacing: ".01em",
                  lineHeight: 1.3,
                  color: isOpen
                    ? "var(--fac-yellow)"
                    : invert
                      ? "var(--text-on-invert)"
                      : "var(--text-primary)",
                  transition: "var(--transition-ui)",
                }}
              >
                {it.question}
              </span>
              <span
                aria-hidden="true"
                style={{
                  width: 26,
                  height: 26,
                  flex: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${
                    isOpen ? "var(--fac-yellow)" : invert ? "rgba(49,49,49,.22)" : "var(--line-strong)"
                  }`,
                  borderRadius: "var(--radius-xs)",
                  color: isOpen ? "var(--fac-yellow)" : "var(--text-muted)",
                  fontSize: 15,
                  lineHeight: 1,
                  transition: "var(--transition-ui)",
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              style={{
                maxHeight: isOpen ? 400 : 0,
                overflow: "hidden",
                transition: "max-height var(--dur-slow) var(--ease-mech)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  paddingLeft: 46,
                  paddingBottom: "var(--space-6)",
                  maxWidth: 640,
                  fontSize: "var(--fs-body-sm)",
                  lineHeight: "var(--lh-body)",
                  color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
                }}
              >
                {it.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
