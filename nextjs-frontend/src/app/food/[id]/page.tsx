// Generate static params for all food/product IDs
export async function generateStaticParams() {
  console.log('🔄 Generating static params for food pages...');
  return [];
}

import FoodDetailsClient from './FoodDetailsClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function FoodDetailsPage({ params }: PageProps) {
  return <FoodDetailsClient id={params.id} />;
}
