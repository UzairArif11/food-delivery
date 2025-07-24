import EditCategoryClient from './EditCategoryClient';

// Generate static params for all category IDs
export async function generateStaticParams(): Promise<{ id: string }[]> {
  console.log('🔄 Generating static params for edit-category pages...');
  
  // Always return an empty array to allow build to succeed
  // Dynamic pages will be generated on-demand
  return [];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: PageProps) {
  return <EditCategoryClient id={params.id} />;
}
