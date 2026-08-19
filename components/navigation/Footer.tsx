import type * as React from "react";
import Link from "next/link";
import { linkTag } from "../core/link-tag";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterSocial {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

/**
 * Site footer on the darkest surface (--neutral-1000): logo + blurb, link
 * columns, contact block, mono legal strip.
 */
export interface FooterProps {
  logo?: string;
  blurb?: React.ReactNode;
  columns?: FooterColumn[];
  address?: React.ReactNode;
  email?: string;
  phone?: string;
  hours?: React.ReactNode;
  social?: FooterSocial[];
  legal?: React.ReactNode;
  /**
   * Razón social y RFC. Se rinde en su propia línea de la franja legal, con
   * más contraste que el resto de la franja: es el dato que consultan las
   * plataformas al verificar a quién pertenece el dominio.
   */
  fiscal?: React.ReactNode;
  style?: React.CSSProperties;
}

function Col({ title, links = [] }: FooterColumn) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-eyebrow)",
          letterSpacing: "var(--ls-eyebrow)",
          textTransform: "uppercase",
          color: "var(--fac-yellow)",
        }}
      >
        {title}
      </span>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        {links.map((l) => {
          const LinkTag = linkTag(l.href);
          return (
            <li key={l.label}>
              <LinkTag
                href={l.href}
                style={{
                  fontSize: "var(--fs-body-sm)",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </LinkTag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer({
  logo,
  blurb,
  columns = [],
  address,
  email,
  phone,
  hours,
  social = [],
  legal,
  fiscal,
  style,
}: FooterProps) {
  return (
    <footer
      style={{
        background: "var(--neutral-1000)",
        borderTop: "1px solid var(--line-hairline)",
        paddingTop: "var(--space-20)",
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--space-8)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr",
            gap: "var(--space-12)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- design-system primitive: logo path is caller-supplied
              <img
                src={logo}
                alt="Grupo FAC"
                style={{
                  height: 44,
                  width: "auto",
                  objectFit: "contain",
                  alignSelf: "flex-start",
                }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--fw-black)",
                  fontSize: 22,
                  color: "var(--fac-white)",
                  textTransform: "uppercase",
                }}
              >
                Grupo FAC
              </span>
            )}
            <p
              style={{
                fontSize: "var(--fs-body-sm)",
                color: "var(--text-muted)",
                margin: 0,
                maxWidth: 320,
              }}
            >
              {blurb}
            </p>
            {social.length ? (
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    style={{
                      width: 38,
                      height: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--line-hairline)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s.icon || s.label.slice(0, 2)}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          {columns.map((c) => (
            <Col key={c.title} {...c} />
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-eyebrow)",
                letterSpacing: "var(--ls-eyebrow)",
                textTransform: "uppercase",
                color: "var(--fac-yellow)",
              }}
            >
              Contáctanos
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                fontSize: "var(--fs-body-sm)",
                color: "var(--text-muted)",
              }}
            >
              {address ? <span>{address}</span> : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                >
                  {email}
                </a>
              ) : null}
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  style={{
                    color: "var(--fac-white)",
                    fontFamily: "var(--font-mono)",
                    textDecoration: "none",
                  }}
                >
                  {phone}
                </a>
              ) : null}
              {hours ? <span style={{ fontSize: "var(--fs-caption)" }}>{hours}</span> : null}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "var(--space-16)",
            paddingBlock: "var(--space-6)",
            borderTop: "1px solid var(--line-hairline)",
            display: "flex",
            justifyContent: "space-between",
            gap: "var(--space-6)",
            flexWrap: "wrap",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--neutral-500)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {fiscal ? <span style={{ color: "var(--text-muted)" }}>{fiscal}</span> : null}
            <span>{legal || "© 2026 Grupo FAC. Todos los derechos reservados."}</span>
          </div>
          <Link
            href="/terminos-y-condiciones"
            style={{ color: "var(--neutral-500)", textDecoration: "none" }}
          >
            Términos y condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
