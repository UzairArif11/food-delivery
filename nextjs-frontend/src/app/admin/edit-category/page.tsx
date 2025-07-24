'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import EditCategoryClient from './[id]/EditCategoryClient';

function EditCategoryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category ID Required</h1>
          <p className="text-gray-600">Please provide a category ID to edit.</p>
        </div>
      </div>
    );
  }

  return <EditCategoryClient id={id} />;
}

export default function EditCategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCategoryContent />
    </Suspense>
  );
}
