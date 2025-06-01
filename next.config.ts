import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://43.200.17.139:8080/api/:path*",
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["placehold.co"],
  },
};

export default nextConfig;
