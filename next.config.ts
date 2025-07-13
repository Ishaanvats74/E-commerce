import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'assets.myntassets.com',
      port: '',
      pathname: '/**',
    },
  ],
}

};

export default nextConfig;
