/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: For production static export, uncomment the line below:
  // output: "export",
  images: {
    unoptimized: true, // For local images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
