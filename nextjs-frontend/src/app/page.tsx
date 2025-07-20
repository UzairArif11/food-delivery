import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Order delicious food online with fast delivery. Fresh ingredients, quality dishes, and exceptional service delivered to your door.',
  keywords: 'food delivery, online ordering, restaurant, fast delivery, quality food',
  openGraph: {
    title: 'FoodDelivery - Order Food Online',
    description: 'Get your favorite dishes delivered fast with exceptional quality and service.',
    images: ['/assets/images/home-og.jpg'],
  },
};

// Dynamically import to support client-side components
const HomePageContent = dynamic(() => import('@/components/HomePageContent'), { ssr: false });

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomePageContent />
      <Footer />
    </div>
  );
}
