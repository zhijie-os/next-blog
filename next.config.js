/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'demudihnm',
    NEXT_PUBLIC_CLOUDINARY_API_KEY: '269287813223569',
    CLOUDINARY_API_SECRET: 'gZuYvJ7eT5ASQRLSchkWtALhiis'
  },
  images: {
    remotePatterns:[
      {
        hostname: 'source.unsplash.com',
      }
    ],
    // domains:['bit.ly','source.unsplash.com']
  },
}

module.exports = nextConfig
