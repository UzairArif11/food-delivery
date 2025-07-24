// Generate static params for all category IDs
export async function generateStaticParams() {
  console.log('🔄 Generating static params for edit-category pages...');
  return [];
}

import EditCategoryClient from './EditCategoryClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: PageProps) {
  return <EditCategoryClient id={params.id} />;
}
