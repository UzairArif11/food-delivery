import FoodDetailsClient from './FoodDetailsClient';

// Generate static params for all food/product IDs
export async function generateStaticParams() {
  try {
    // For static generation, we'll fetch all products/food items
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      const products = data.data || [];
      
      return products.map((product: any) => ({
        id: product._id.toString(),
      }));
    }
  } catch (error) {
    console.log('Error fetching products for static generation:', error);
  }
  
  // Fallback: return empty array if API call fails
  // This allows the build to continue without pre-generating these pages
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
