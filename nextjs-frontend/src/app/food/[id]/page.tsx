import FoodDetailsClient from './FoodDetailsClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function FoodDetailsPage({ params }: PageProps) {
  return <FoodDetailsClient id={params.id} />;
}
