'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import EditProductClient from './[id]/EditProductClient';

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product ID Required</h1>
          <p className="text-gray-600">Please provide a product ID to edit.</p>
        </div>
      </div>
    );
  }

  return <EditProductClient id={id} />;
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProductContent />
    </Suspense>
  );
}
