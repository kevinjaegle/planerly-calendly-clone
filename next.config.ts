import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WIR FÜGEN DIESEN BLOCK HINZU
  typescript: {
    // !! WARNUNG !!
    // Erlaubt das Erstellen der Produktionsversion, auch wenn das
    // Projekt Typ-Fehler hat.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;