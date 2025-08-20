import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with FoodDelivery for support, feedback, or partnership opportunities. We\'re here to help!',
  keywords: 'contact, support, customer service, feedback, partnership',
  openGraph: {
    title: 'Contact Us | FoodDelivery',
    description: 'Get in touch with us for support, feedback, or partnership opportunities.',
    images: ['/assets/images/contact-og.jpg'],
  },
};

const ContactPageContent = dynamic(() => import('@/components/ContactPageContent'), { ssr: false });

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ContactPageContent />
      <Footer />
    </div>
  );
}
