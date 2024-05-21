/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API_ENDPOINT: process.env.BASE_API_ENDPOINT,
    JAWABAN_SOAL: process.env.JAWABAN_SOAL,
  },
};

export default nextConfig;
