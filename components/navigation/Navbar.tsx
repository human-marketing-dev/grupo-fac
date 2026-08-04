"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../core/Button";
import { linkTag } from "../core/link-tag";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

/**
 * Sticky site header: optional mono utility strip, logo, uppercase nav with
 * hover dropdown, yellow CTA.
 *
 * This is the system's only use of transparency + blur — rgba(25,25,25,.55)
 * over backdrop-filter: blur(14px), so machinery reads through it as you
 * scroll. Do not blur anything else.
 */
export interface NavbarProps {
  /** Path to the white FAC logo */
  logo?: string;
  items?: NavItem[];
  /** href of the current page — gets a yellow underline */
  activeHref?: string;
  cta?: React.ReactNode;
  ctaHref?: string;
  /** Shows the top utility strip when provided */
  phone?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Navbar({
  logo,
  items = [],
  activeHref,
  cta = "Cotizar proyecto",
  ctaHref = "#cotizar",
  phone,
  style,
}: NavbarProps) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--surface-glass)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line-hairline)",
        ...style,
      }}
    >
      {phone ? (
        // La barra tiñe todo el ancho, pero su contenido se alinea al mismo
        // contenedor que el nav de abajo.
        <div
          style={{
            background: "var(--neutral-1000)",
            borderBottom: "1px solid var(--line-hairline)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-6)",
              padding: "7px var(--space-8)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            <span>Monterrey, N.L.</span>
            <span style={{ color: "var(--fac-yellow)" }}>{phone}</span>
          </div>
        </div>
      ) : null}
      <nav
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "var(--space-4) var(--space-8)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-10)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- design-system primitive: logo path is caller-supplied
            <img src={logo} alt="Grupo FAC" style={{ height: 34, display: "block" }} />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-black)",
                fontSize: 20,
                letterSpacing: "-.01em",
                color: "var(--fac-white)",
                textTransform: "uppercase",
              }}
            >
              Grupo FAC
            </span>
          )}
        </Link>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "var(--space-8)",
            margin: 0,
            padding: 0,
            flex: 1,
          }}
        >
          {items.map((it) => {
            const active = it.href === activeHref;
            const isOpen = open === it.label;
            const ItemTag = linkTag(it.href);
            return (
              <li
                key={it.label}
                onMouseEnter={() => setOpen(it.label)}
                onMouseLeave={() => setOpen(null)}
                style={{ position: "relative" }}
              >
                <ItemTag
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--fs-caption)",
                    fontWeight: "var(--fw-semibold)",
                    letterSpacing: "var(--ls-button)",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: active || isOpen ? "var(--fac-yellow)" : "var(--text-secondary)",
                    paddingBlock: "var(--space-3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "var(--transition-ui)",
                  }}
                >
                  {it.label}
                  {it.children ? (
                    <span aria-hidden="true" style={{ fontSize: 8, opacity: 0.7 }}>
                      ▼
                    </span>
                  ) : null}
                </ItemTag>
                {active ? (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -1,
                      height: 2,
                      background: "var(--fac-yellow)",
                    }}
                  />
                ) : null}
                {it.children && isOpen ? (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: -14,
                      minWidth: 268,
                      listStyle: "none",
                      margin: 0,
                      padding: "var(--space-2)",
                      background: "var(--neutral-850)",
                      border: "1px solid var(--line-hairline)",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-overlay)",
                    }}
                  >
                    {it.children.map((c) => {
                      const ChildTag = linkTag(c.href);
                      return (
                        <li key={c.label}>
                          <ChildTag
                            href={c.href}
                            style={{
                              display: "block",
                              padding: "10px 12px",
                              fontSize: "var(--fs-body-sm)",
                              color: "var(--text-secondary)",
                              textDecoration: "none",
                              borderRadius: "var(--radius-xs)",
                              transition: "var(--transition-ui)",
                            }}
                          >
                            {c.label}
                          </ChildTag>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        <Button variant="primary" size="sm" href={ctaHref} style={{ flex: "none" }}>
          {cta}
        </Button>
      </nav>
    </header>
  );
}
