import type * as React from "react";
import Image from "next/image";

/**
 * Foto de obra en formato vertical para acompañar un bloque de la landing.
 *
 * Las fuentes son tomas de dron en 16:9, así que el recorte a vertical se come
 * más de la mitad del ancho: `objectPosition` existe para encuadrar el sujeto
 * en lugar de recortar por el centro a ciegas.
 *
 * Sigue las reglas del sistema: foto ligeramente desaturada (`saturate(.85)`)
 * y filete amarillo en el borde inferior.
 */
export interface SectionPhotoProps {
  src: string;
  /** Descripción real de la escena, no el nombre del archivo */
  alt: string;
  /** CSS aspect-ratio. Vertical por defecto. */
  ratio?: string;
  /**
   * Encuadre del recorte, p. ej. "45% 50%". Con fuentes 16:9 en un contenedor
   * vertical el alto encaja exacto y solo sobra ancho, así que **solo el valor
   * horizontal tiene efecto**; el vertical queda en 50% por claridad.
   */
  objectPosition?: string;
  /**
   * OJO: `sizes` debe describir el ancho al que se ESCALA la foto, no el ancho
   * del marco. Con `object-fit: cover`, una fuente 16:9 dentro de un marco 4/5
   * se amplía hasta 16/9 ÷ 4/5 = **2.22 veces** el ancho del marco (lo que
   * sobra se recorta). Declarar aquí el ancho del marco hace que el navegador
   * baje un archivo 2.2x más chico del necesario y lo amplíe: se ve pixeleado.
   *
   * El marco mide ~40-42% del contenedor, que topa en 1450px → como mucho unos
   * 1250px de ancho renderizado.
   */
  sizes?: string;
  style?: React.CSSProperties;
}

export function SectionPhoto({
  src,
  alt,
  ratio = "4/5",
  objectPosition = "50% 50%",
  sizes = "(min-width: 1450px) 1250px, 90vw",
  style,
}: SectionPhotoProps) {
  return (
    <figure
      style={{
        position: "relative",
        margin: 0,
        aspectRatio: ratio,
        overflow: "hidden",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--line-hairline)",
        background: "var(--surface-inset)",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition, filter: "saturate(.85)" }}
      />
      {/* filete amarillo al pie de la imagen — gesto recurrente del sistema */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: "var(--rule-accent)",
          background: "var(--fac-yellow)",
        }}
      />
    </figure>
  );
}
