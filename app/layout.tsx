import type { Metadata } from "next";
import { Archivo, Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * Font substitutions proposed by the design system — Grupo FAC has not
 * supplied licensed brand faces. If they arrive, only this block changes.
 * See the design project's readme, "Font substitution".
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grupo FAC — Expertos en cimentaciones profundas",
    template: "%s | Grupo FAC",
  },
  description:
    "Construcción industrial, cimentaciones profundas, terracerías y renta de maquinaria pesada en el noreste de México. Más de 10 años de obra entregada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${archivo.variable} ${barlow.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
