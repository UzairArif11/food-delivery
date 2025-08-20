import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your selected items and proceed to checkout for delicious food delivery.',
  openGraph: {
    title: 'Your Cart | FoodDelivery',
    description: 'Review your selected items and proceed to checkout.',
  },
};

const CartPageContent = dynamic(() => import('@/components/CartPageContent'), { ssr: false });

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartPageContent />
      <Footer />
    </div>
  );
}
