import EditCategoryClient from './EditCategoryClient';

// Generate static params for all category IDs
export async function generateStaticParams() {
  // For SSG build, we provide a minimal set to ensure build succeeds
  // In production, you might want to fetch from your API during build time
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.log('NEXT_PUBLIC_API_URL not set, using empty params for categories');
    return [];
  }
  
  try {
    console.log('Fetching categories for static generation from:', `${apiUrl}/api/v1/categories`);
    
    const response = await fetch(`${apiUrl}/api/v1/categories`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      const categories = data.data || [];
      
      console.log(`Found ${categories.length} categories for static generation`);
      
      return categories.map((category: any) => ({
        id: category._id?.toString() || category.id?.toString() || 'unknown',
      }));
    } else {
      console.log('API response not ok:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('Error fetching categories for static generation:', error);
  }
  
  // Fallback: return empty array if API call fails
  // This allows the build to continue without pre-generating these pages
  console.log('Using empty params array for edit-category pages');
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
