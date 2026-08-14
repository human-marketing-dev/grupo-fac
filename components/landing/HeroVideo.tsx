"use client";

import * as React from "react";

/**
 * Vídeo de fondo del hero, con overlay.
 *
 * Rellena a su contenedor, que debe llevar `position: relative` y
 * `overflow: hidden`. El contenido del hero va encima con `z-index`.
 *
 * **El overlay no es decorativo, es de legibilidad.** El vídeo es de día y muy
 * claro (luminancia media 167/255, picos de 198), así que sin scrim el texto
 * blanco no se lee. Se combinan dos capas: el `--scrim-flat` del sistema (55%)
 * sobre toda la superficie, más un degradado lateral del lado de la copia. El
 * resultado deja el fondo entre 55% y 75% de oscurecimiento, que da ~9:1 de
 * contraste al blanco y ~5.5:1 al texto secundario — AA incluso en el
 * fotograma más brillante.
 *
 * No lleva `autoPlay`: la reproducción se lanza desde JS para poder respetar
 * `prefers-reduced-motion`, en cuyo caso se queda el póster fijo. El vídeo no
 * tiene pista de audio.
 */
export interface HeroVideoProps {
  src: string;
  /** Fotograma fijo: se ve mientras carga y con movimiento reducido */
  poster: string;
  /** Textura de rejilla técnica por encima del vídeo */
  grid?: boolean;
}

export function HeroVideo({ src, poster, grid = true }: HeroVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimate(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (animate) {
      // Puede rechazarse si el navegador bloquea la reproducción automática;
      // en ese caso se queda el póster, que es un resultado aceptable.
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [animate]);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 50%",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--scrim-flat)",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right,rgba(13,13,13,.45) 0%,rgba(13,13,13,.12) 62%,rgba(13,13,13,0) 100%)",
        }}
      />
      {grid ? (
        <span style={{ position: "absolute", inset: 0, background: "var(--texture-grid)" }} />
      ) : null}
    </div>
  );
}
