"use client";

import * as React from "react";
import Image from "next/image";

export interface ClientLogoItem {
  src: string;
  /** Nombre de la marca, para el alt */
  name: string;
}

/**
 * Muro de logos de cliente en banda continua.
 *
 * La pista lleva la lista duplicada y se desplaza de 0 a -50% con los keyframes
 * `facMarquee` de globals.css, así que el bucle no tiene costura. Se detiene al
 * pasar el cursor para poder leer las marcas.
 *
 * Los archivos vienen recortados a su tinta (`public/logos-clientes/`), porque
 * los originales traen lienzo cuadrado con relleno muy dispar — sin recortar,
 * un logo ancho sale diminuto al lado de uno alto. La caja limita alto y ancho
 * a la vez para que ninguno domine.
 *
 * Son marcas blancas sobre transparente, así que NO se les aplica el
 * `grayscale(1)` del sistema (no hay color que quitar): el reposo se resuelve
 * con opacidad.
 */
export interface ClientLogoMarqueeProps {
  logos: ClientLogoItem[];
  /** Segundos por vuelta completa. Más alto = más lento. */
  speed?: number;
  /** Caja máxima de cada logo */
  maxWidth?: number;
  maxHeight?: number;
}

export function ClientLogoMarquee({
  logos,
  speed = 45,
  maxWidth = 190,
  maxHeight = 70,
}: ClientLogoMarqueeProps) {
  const [paused, setPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const run = [...logos, ...logos];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        // Difuminado en los bordes para que las marcas entren y salgan
        // en lugar de cortarse en seco contra el borde de la sección.
        maskImage:
          "linear-gradient(to right,transparent 0,#000 96px,#000 calc(100% - 96px),transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right,transparent 0,#000 96px,#000 calc(100% - 96px),transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: "var(--space-16)",
          animation: `facMarquee ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {run.map((logo, i) => {
          const dup = i >= logos.length;
          const key = `${logo.name}-${i}`;
          return (
            <div
              key={key}
              // La segunda copia solo existe para cerrar el bucle: se oculta a
              // los lectores de pantalla para no anunciar cada marca dos veces.
              aria-hidden={dup ? "true" : undefined}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                flex: "none",
                width: maxWidth,
                height: maxHeight,
                opacity: hovered === key ? 1 : 0.55,
                transition: "opacity var(--dur-base) var(--ease-mech)",
              }}
            >
              <Image
                src={logo.src}
                alt={dup ? "" : logo.name}
                fill
                sizes={`${maxWidth}px`}
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
