import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
