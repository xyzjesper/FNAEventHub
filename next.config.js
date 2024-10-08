/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTHURL: process.env.AUTHURL, // pulls from .env file
    NEXTMONGODBURL: process.env.MONGODBURL, // pulls from .env file
    NEXTDBNAME: process.env.DBNAME, // pulls from .env file
  },
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
      {
        protocol: "https",
        hostname: "*",
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
