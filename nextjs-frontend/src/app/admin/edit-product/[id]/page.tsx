import EditProductClient from './EditProductClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: PageProps) {
  return <EditProductClient id={params.id} />;
}
