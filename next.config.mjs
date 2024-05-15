/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API_ENDPOINT: process.env.BASE_API_ENDPOINT,
  },
};

export default nextConfig;
