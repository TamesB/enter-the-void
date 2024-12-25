import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // enable @ts-ignore comments
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // enable @ts-expect-error comments
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options
    styledComponents: {
      ssr: true,
      displayName: true,
      fileName: true,
    },
  },
  
};

export default nextConfig;
