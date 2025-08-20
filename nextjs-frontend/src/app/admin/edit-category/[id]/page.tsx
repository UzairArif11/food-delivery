import EditCategoryClient from './EditCategoryClient';

// Generate static params - required for output: 'export'
export async function generateStaticParams() {
  // Generate a dummy param to satisfy Next.js SSG requirements
  // Real pages will be handled client-side
  return [
    { id: 'placeholder' }
  ];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: PageProps) {
  return <EditCategoryClient id={params.id} />;
}
