import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Vecchio URL usato nei link della home
      { source: "/soggiorno", destination: "/soggiorni", permanent: true },
      { source: "/camere", destination: "/soggiorni/camere", permanent: true },
      {
        source: "/appartamenti",
        destination: "/soggiorni/appartamenti",
        permanent: true,
      },
      { source: "/contact", destination: "/contatti", permanent: true },
      { source: "/galleria", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
