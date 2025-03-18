import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["api.slingacademy.com"], // Adiciona o domínio para permitir imagens deste host
    // Alternativamente, você pode usar remotePatterns para mais controle:
    /*
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: '',
        pathname: '/public/sample-products/**',
      },
    ],
    */
  },
};

export default nextConfig;
