import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/global.css';
import '@/styles/admin.css';
import '@/styles/login.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import StructuredData from '@/components/StructuredData';
import { Toaster } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Shangrila Restaurant - Elevating Desi Cuisine Since 1989',
    template: '%s | Shangrila Restaurant'
  },
  applicationName: 'Shangrila Restaurant',
  description: 'Since 1989, Shangrila has been Lahore\'s go-to destination for rich, authentic Pakistani cuisine. From legendary Fari Daal to traditional desi flavors, every plate celebrates our culinary heritage.',
  keywords: 'shangrila restaurant lahore, pakistani food, desi cuisine, fari daal, authentic pakistani restaurant, food delivery lahore, traditional pakistani dishes, kalagi, mutton joint, shahi daal',
  authors: [{ name: 'Shangrila Restaurant Team' }],
  creator: 'shangrilaresturant',
  publisher: 'shangrilaresturant',
  robots: 'index,follow',
  icons: {
    icon: [
      { url: '/custom-icon.png', type: 'image/png' },
      { url: '/custom-icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/custom-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/custom-icon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/custom-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/custom-icon.png', color: '#ea580c' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Shangrila Restaurant',
    title: 'Shangrila Restaurant - Elevating Desi Cuisine Since 1989',
    description: 'Authentic Pakistani cuisine in Lahore since 1989. Experience the best desi flavors with our signature dishes like Fari Daal, Kalagi, and Mutton Joint.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shangrila Restaurant - Authentic Pakistani Cuisine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shangrila Restaurant - Elevating Desi Cuisine Since 1989',
    description: 'Authentic Pakistani cuisine in Lahore since 1989. Experience the best desi flavors with traditional recipes and modern precision.',
    images: ['/assets/images/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  manifest: '/manifest.json',
  themeColor: '#ea580c',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'food and drink',
  classification: 'restaurant, food delivery service',
  other: {
    'geo.region': 'PK',
    'geo.placename': 'Lahore, Punjab, Pakistan',
    'geo.position': '31.5598980;74.3101817',
    'ICBM': '31.5598980, 74.3101817',
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData />
        <ErrorBoundary>
          <ReduxProvider>
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={5000}
            />
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
