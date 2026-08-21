"use client";

import * as React from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select, type SelectOption } from "./Select";
import { Button } from "../core/Button";
import {
  HONEYPOT_FIELD,
  LIMITES,
  SERVICIOS,
  validarLead,
  type Lead,
  type LeadErrors,
} from "@/lib/leads";

/**
 * Bloque de solicitud de cotización del CTA de cierre.
 *
 * El transporte se inyecta con `endpoint`. Sin él, el formulario no toca la red
 * y solo demuestra el estado de éxito — así el espécimen de /design-system
 * queda inerte y nunca dispara un correo real.
 *
 * La validación de cliente comparte módulo con la del servidor
 * (`lib/leads.ts`), pero es solo cortesía: el route valida de nuevo todo.
 */
export interface QuoteFormProps {
  /** Ruta del API que recibe el lead, p. ej. "/api/leads". Sin esto es inerte. */
  endpoint?: string;
  /** Sobrescribe las líneas de servicio */
  services?: SelectOption[];
  submitLabel?: string;
  invert?: boolean;
  style?: React.CSSProperties;
}

type Estado = "idle" | "enviando" | "ok" | "error";

const VACIO: Lead = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  servicio: "",
  alcance: "",
};

export function QuoteForm({
  endpoint,
  services,
  submitLabel = "Solicitar cotización",
  invert = false,
  style,
}: QuoteFormProps) {
  const [valores, setValores] = React.useState<Lead>(VACIO);
  const [trampa, setTrampa] = React.useState("");
  const [errores, setErrores] = React.useState<LeadErrors>({});
  const [estado, setEstado] = React.useState<Estado>("idle");
  const [mensajeError, setMensajeError] = React.useState("");

  const opts = services ?? [...SERVICIOS];
  const enviando = estado === "enviando";

  const set = (campo: keyof Lead) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setValores((prev) => ({ ...prev, [campo]: value }));
    // Limpia el error del campo en cuanto el usuario lo toca.
    setErrores((prev) => (prev[campo] ? { ...prev, [campo]: undefined } : prev));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;

    const revision = validarLead({ ...valores });
    if (!revision.ok) {
      setErrores(revision.errors);
      setEstado("idle");
      setMensajeError("Revisa los campos marcados.");
      return;
    }
    setErrores({});
    setMensajeError("");

    // Sin endpoint (espécimen del sistema de diseño): no se toca la red.
    if (!endpoint) {
      setEstado("ok");
      return;
    }

    setEstado("enviando");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...revision.data, [HONEYPOT_FIELD]: trampa }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setEstado("ok");
        return;
      }
      // El servidor manda: si devuelve errores por campo, se pintan.
      if (data?.errors) {
        setErrores(data.errors as LeadErrors);
        setMensajeError("Revisa los campos marcados.");
      } else {
        setMensajeError(
          typeof data?.error === "string"
            ? data.error
            : "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
        );
      }
      setEstado("error");
    } catch {
      setMensajeError(
        "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
      );
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          padding: "var(--space-8)",
          borderTop: "var(--rule-accent) solid var(--fac-yellow)",
          background: invert ? "var(--surface-invert-card)" : "var(--surface-raised)",
          borderRadius: "var(--radius-md)",
          ...style,
        }}
        role="status"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-eyebrow)",
            letterSpacing: "var(--ls-eyebrow)",
            textTransform: "uppercase",
            color: "var(--fac-yellow)",
          }}
        >
          Solicitud enviada
        </span>
        <p
          style={{
            margin: 0,
            fontSize: "var(--fs-body-lg)",
            lineHeight: "var(--lh-body)",
            color: invert ? "var(--text-on-invert)" : "var(--text-primary)",
          }}
        >
          Gracias. Recibimos tu solicitud y te contactamos en menos de 24 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      // noValidate: los campos conservan `required` para lectores de pantalla,
      // pero la validación nativa se desactiva para poder mostrar nuestros
      // mensajes en español debajo de cada campo en vez de los globos del
      // navegador.
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "var(--space-5)",
        }}
      >
        <Input
          name="nombre"
          label="Nombre"
          placeholder="Nombre y apellido"
          required
          invert={invert}
          value={valores.nombre}
          onChange={set("nombre")}
          error={errores.nombre}
        />
        <Input
          name="empresa"
          label="Empresa"
          placeholder="Razón social"
          required
          invert={invert}
          value={valores.empresa}
          onChange={set("empresa")}
          error={errores.empresa}
        />
        <Input
          name="email"
          label="Correo"
          type="email"
          placeholder="nombre@empresa.com"
          required
          invert={invert}
          value={valores.email}
          onChange={set("email")}
          error={errores.email}
        />
        <Input
          name="telefono"
          label="Teléfono"
          type="tel"
          placeholder="+52 81 0000 0000"
          required
          invert={invert}
          value={valores.telefono}
          onChange={set("telefono")}
          error={errores.telefono}
        />
      </div>

      <Select
        name="servicio"
        label="Servicio de interés"
        options={opts}
        required
        invert={invert}
        value={valores.servicio}
        onChange={set("servicio")}
        error={errores.servicio}
      />

      <Textarea
        name="alcance"
        label="Alcance del proyecto"
        rows={4}
        placeholder="Ubicación, superficie, fechas estimadas"
        required
        invert={invert}
        value={valores.alcance}
        onChange={set("alcance")}
        error={errores.alcance}
      />

      {/* Trampa para bots. Fuera de pantalla pero NO display:none, para que los
          bots la vean y la rellenen. Oculta a lectores de pantalla y fuera del
          orden de tabulación, para que ninguna persona la encuentre. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, top: "auto" }}>
        <label htmlFor={HONEYPOT_FIELD}>No rellenes este campo</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      {estado === "error" && mensajeError ? (
        <p
          role="alert"
          style={{
            margin: 0,
            padding: "var(--space-3) var(--space-4)",
            border: "1px solid var(--state-danger)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--fs-body-sm)",
            color: "var(--state-danger)",
          }}
        >
          {mensajeError}
        </p>
      ) : null}

      <Button variant="primary" size="lg" fullWidth type="submit" disabled={enviando}>
        {enviando ? "Enviando…" : submitLabel}
      </Button>

      <p
        style={{
          fontSize: "var(--fs-caption)",
          color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
          margin: 0,
        }}
      >
        Todos los campos son obligatorios. Respondemos en menos de 24 horas hábiles.
        {" "}
        Máximo {LIMITES.alcance.max} caracteres en el alcance.
      </p>
    </form>
  );
}
