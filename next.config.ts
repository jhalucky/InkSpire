// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
     domains: ["res.cloudinary.com","cdn-icons-png.flaticon.com", "pimpmytype.com", "img.icons8.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;