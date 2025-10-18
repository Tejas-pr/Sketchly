/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
  },
};

export default nextConfig;


// const allowedOrigins =
//   process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(",").map(o => o.trim()) ?? [
//     "http://localhost:3000",
//     "https://drawing.tejaspr.site",
//   ];