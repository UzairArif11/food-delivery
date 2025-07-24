import FoodDetailsClient from './FoodDetailsClient';

// Generate static params for all food/product IDs
export async function generateStaticParams() {
  // For SSG build, we provide a minimal set to ensure build succeeds
  // In production, you might want to fetch from your API during build time
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.log('NEXT_PUBLIC_API_URL not set, using empty params for food pages');
    return [];
  }
  
  try {
    console.log('Fetching products for static generation from:', `${apiUrl}/api/v1/products`);
    
    const response = await fetch(`${apiUrl}/api/v1/products`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      const products = data.data || [];
      
      console.log(`Found ${products.length} products for static generation`);
      
      return products.map((product: any) => ({
        id: product._id?.toString() || product.id?.toString() || 'unknown',
      }));
    } else {
      console.log('API response not ok:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('Error fetching products for static generation:', error);
  }
  
  // Fallback: return empty array if API call fails
  // This allows the build to continue without pre-generating these pages
  console.log('Using empty params array for food pages');
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
