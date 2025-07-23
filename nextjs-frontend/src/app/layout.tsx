import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/global.css';
import '@/styles/admin.css';
import '@/styles/login.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { ToastContainer } from 'react-toastify';
import StructuredData from '@/components/StructuredData';
import 'react-toastify/dist/ReactToastify.css';

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
    default: 'FoodDelivery - Delicious Food Delivered Fast',
    template: '%s | FoodDelivery'
  },
  description: 'Order your favorite dishes from our restaurant and get them delivered right to your doorstep in no time. Fresh ingredients, carefully prepared dishes, and fast delivery.',
  keywords: 'food delivery, restaurant, online ordering, fast food, fresh ingredients, home delivery',
  authors: [{ name: 'FoodDelivery Team' }],
  creator: 'FoodDelivery',
  publisher: 'FoodDelivery',
  robots: 'index,follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'FoodDelivery',
    title: 'FoodDelivery - Delicious Food Delivered Fast',
    description: 'Order your favorite dishes from our restaurant and get them delivered right to your doorstep in no time.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodDelivery - Delicious Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodDelivery - Delicious Food Delivered Fast',
    description: 'Order your favorite dishes from our restaurant and get them delivered right to your doorstep in no time.',
    images: ['/assets/images/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <StructuredData />
        <ReduxProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
