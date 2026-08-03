"use client";

import * as React from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select, type SelectOption } from "./Select";
import { Button } from "../core/Button";

/**
 * The full quote-request block used in the closing CTA of every page.
 *
 * Note: this is the design-system presentation only — it has no submit
 * transport. Pass `onSubmit` to wire it to a real endpoint; the default
 * behaviour just flips the button label.
 */
export interface QuoteFormProps {
  /** Override the four default service lines */
  services?: SelectOption[];
  submitLabel?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  invert?: boolean;
  style?: React.CSSProperties;
}

const DEFAULT_SERVICES: SelectOption[] = [
  { value: "construccion", label: "Construcción industrial integral" },
  { value: "cimentaciones", label: "Cimentaciones profundas" },
  { value: "terracerias", label: "Terracerías y pavimentos" },
  { value: "renta", label: "Renta de maquinaria pesada" },
];

export function QuoteForm({
  services,
  submitLabel = "Solicitar cotización",
  onSubmit,
  invert = false,
  style,
}: QuoteFormProps) {
  const [sent, setSent] = React.useState(false);
  const opts = services ?? DEFAULT_SERVICES;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        onSubmit?.(e);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "var(--space-5)",
        }}
      >
        <Input label="Nombre" placeholder="Nombre y apellido" required invert={invert} />
        <Input label="Empresa" placeholder="Razón social" invert={invert} />
        <Input
          label="Correo"
          type="email"
          placeholder="nombre@empresa.com"
          required
          invert={invert}
        />
        <Input label="Teléfono" type="tel" placeholder="+52 81 0000 0000" invert={invert} />
      </div>
      <Select label="Servicio de interés" options={opts} invert={invert} />
      <Textarea
        label="Alcance del proyecto"
        rows={4}
        placeholder="Ubicación, superficie, fechas estimadas"
        invert={invert}
      />
      <Button variant="primary" size="lg" fullWidth type="submit">
        {sent ? "Solicitud enviada" : submitLabel}
      </Button>
      <p
        style={{
          fontSize: "var(--fs-caption)",
          color: invert ? "var(--text-on-invert-muted)" : "var(--text-muted)",
          margin: 0,
        }}
      >
        Respondemos en menos de 24 horas hábiles.
      </p>
    </form>
  );
}
