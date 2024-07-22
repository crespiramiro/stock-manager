/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/api'
        : 'https://stock-manager-back.vercel.app/api',
    },
  };
  
  export default nextConfig;
  