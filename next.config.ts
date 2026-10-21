import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // Renamed: the project is Miss Illinois, not Miss USA.
      { source: "/work/miss-usa", destination: "/work/miss-illinois", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
