import EditProductClient from './EditProductClient';

// Generate static params for all product IDs
export async function generateStaticParams(): Promise<{ id: string }[]> {
  console.log('🔄 Generating static params for edit-product pages...');
  
  // Always return an empty array to allow build to succeed
  // Dynamic pages will be generated on-demand
  return [];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: PageProps) {
  return <EditProductClient id={params.id} />;
}
