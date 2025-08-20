'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FoodDetailsClientProps {
  id: string;
}

const FoodDetailsClient: React.FC<FoodDetailsClientProps> = ({ id }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Food Details
          </h1>
          <p className="text-gray-600 mb-4">
            Food details for ID: {id}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This page needs to be implemented with full food detail functionality
            including images, description, pricing, and add to cart feature.
          </p>
          
          <div className="space-x-4">
            <button
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push('/menu')}
              className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FoodDetailsClient;
