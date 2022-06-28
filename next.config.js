/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.API_BASE_URL,
  },
  output: "standalone",
};

module.exports = nextConfig;
