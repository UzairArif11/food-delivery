/** @type {import('next').NextConfig} */
const nextConfig = {
  // LINE 1: Creates standalone server for production deployment
  // WHY: Allows running Next.js without node_modules, reduces server size
  output: 'standalone',
  
  // LINES 2-8: Image optimization configuration
  images: {
    // WHY: Allows images from these domains to be optimized by Next.js
    domains: ['localhost', '127.0.0.1', 'foodpanda.site', 'www.foodpanda.site'],
    // WHY: Keep false for automatic WebP conversion and lazy loading (better SEO)
    unoptimized: false,
    remotePatterns: [
      {
        // WHY: Development - allows loading images from local backend
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        // WHY: Production - allows loading images from live backend
        protocol: 'https',
        hostname: 'foodpanda.site',
        pathname: '/api/uploads/**',
      },
    ],
  },
  
  // LINES 9-17: API routing for seamless backend communication
  async rewrites() {
    return [
      {
        // WHY: Routes /api/* calls to backend automatically
        source: '/api/:path*',
        // WHY: Uses live server in production, localhost in development
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://foodpanda.site/api/:path*'
          : 'http://localhost:5000/:path*',
      },
    ]
  },
  
  // LINES 18-20: Performance and security optimizations
  // WHY: Disables ETags to reduce server load
  generateEtags: false,
  // WHY: Hides "X-Powered-By: Next.js" header for security
  poweredByHeader: false,
  // WHY: Enables automatic Gzip compression
  compress: true,
  
  // LINES 21-35: Additional security headers for SEO
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            // WHY: Improves DNS resolution speed
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            // WHY: Prevents MIME type sniffing attacks
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
  
  // LINES 36-38: Bundle size optimization
  experimental: {
    // WHY: Tree-shakes unused code from these heavy libraries
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
