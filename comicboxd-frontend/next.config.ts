/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.hq-now.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
