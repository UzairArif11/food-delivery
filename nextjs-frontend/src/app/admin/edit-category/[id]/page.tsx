import EditCategoryClient from './EditCategoryClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: PageProps) {
  return <EditCategoryClient id={params.id} />;
}
