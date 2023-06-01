/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
