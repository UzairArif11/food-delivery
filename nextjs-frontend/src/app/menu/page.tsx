import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Menu',
  description: 'Explore our delicious offerings, carefully crafted for you. Fresh ingredients, authentic flavors, and exceptional quality.',
  keywords: 'menu, food items, dishes, restaurant menu, food catalog',
  openGraph: {
    title: 'Our Menu | FoodDelivery',
    description: 'Explore our delicious offerings, carefully crafted for you.',
    images: ['/assets/images/menu-og.jpg'],
  },
};

const MenuPageContent = dynamic(() => import('@/components/MenuPageContent'), { 
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MenuPageContent />
      <Footer />
    </div>
  );
}
