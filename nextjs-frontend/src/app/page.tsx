import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Since 1989, Shangrila has been Lahore\'s go-to destination for authentic Pakistani cuisine. Order our legendary Fari Daal, Shahi Daal, Kalagi, and Mutton Joint for fast delivery.',
  keywords: 'shangrila restaurant lahore, pakistani food delivery, desi cuisine, fari daal, shahi daal, authentic pakistani dishes, mozang anarkali restaurant, lahore food delivery',
  openGraph: {
    title: 'shangrilaresturant - Authentic Pakistani Cuisine Since 1989',
    description: 'Experience the best desi flavors in Lahore. Order our signature dishes like Fari Daal, Kalagi, and traditional Pakistani cuisine.',
    images: ['/assets/images/home-og.jpg'],
  },
};

// Import with SSR enabled for better SEO
const HomePageContent = dynamic(() => import('@/components/HomePageContent'), { 
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomePageContent />
      <Footer />
    </div>
  );
}
