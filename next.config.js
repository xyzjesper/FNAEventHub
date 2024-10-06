/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/3VQX3fz",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/",
        permanent: true,
      },
      {
        source: "/twitch",
        destination: "https://www.twitch.tv/pexyfna",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
