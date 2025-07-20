/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13.4+
  images: {
    domains: ['localhost', '127.0.0.1'],
    unoptimized: false, // Enable Next.js Image optimization for better SEO
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  // API proxy for seamless backend integration
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: 'http://localhost:5000/v1/:path*',
      },
    ]
  },
  // Enable source maps for debugging
  productionBrowserSourceMaps: true,
  
  // Optimize for SEO
  generateEtags: false,
  poweredByHeader: false,
}

module.exports = nextConfig
