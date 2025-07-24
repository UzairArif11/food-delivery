/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Change from standalone to export for SSG
  output: 'export',
  
  // LINES 2-8: Image optimization configuration
  images: {
    // WHY: Disable image optimization for static export
    unoptimized: true,
    // WHY: Allows images from these domains to be optimized by Next.js
    domains: ['localhost', '127.0.0.1', 'foodpanda.site', 'www.foodpanda.site'],
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
        pathname: '/uploads/**',
      },
      {
        // WHY: Production - allows loading images from live backend API
        protocol: 'https',
        hostname: 'foodpanda.site',
        pathname: '/api/v1/uploads/**',
      }
    ],
  },
  
  // Disable server features for static export
  trailingSlash: true,
  
  // Environment variables for build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
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
  
  // Exclude admin routes from static export
  async exportPathMap(defaultPathMap) {
    const pathMap = { ...defaultPathMap };
    // Remove admin routes since they require dynamic behavior
    Object.keys(pathMap).forEach(path => {
      if (path.startsWith('/admin')) {
        delete pathMap[path];
      }
    });
    return pathMap;
  },
}

module.exports = nextConfig
