/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    outputFileTracingRoot: __dirname,
  },
};

export default nextConfig;
