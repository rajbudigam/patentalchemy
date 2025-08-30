const { NEXT_PUBLIC_API_BASE } = process.env;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { allowedOrigins: ["*"] } },
  async rewrites() {
    if (!NEXT_PUBLIC_API_BASE) return [];
    return [{ source: "/api-proxy/:path*", destination: `${NEXT_PUBLIC_API_BASE}/:path*` }];
  }
};
export default nextConfig;
