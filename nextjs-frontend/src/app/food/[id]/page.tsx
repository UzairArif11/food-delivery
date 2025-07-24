import FoodDetailsClient from './FoodDetailsClient';

// Generate static params for all food/product IDs
export async function generateStaticParams(): Promise<{ id: string }[]> {
  console.log('🔄 Generating static params for food pages...');
  
  // Always return an empty array to allow build to succeed
  // Dynamic pages will be generated on-demand
  return [];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function FoodDetailsPage({ params }: PageProps) {
  return <FoodDetailsClient id={params.id} />;
}
