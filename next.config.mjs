/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kcncpiekjfsmkwylphkn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
