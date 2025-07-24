// Generate static params for all product IDs
export async function generateStaticParams() {
  console.log('🔄 Generating static params for edit-product pages...');
  return [];
}

import EditProductClient from './EditProductClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: PageProps) {
  return <EditProductClient id={params.id} />;
}
