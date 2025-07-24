import EditCategoryClient from './EditCategoryClient';

// Generate static params for all category IDs
export async function generateStaticParams() {
  try {
    // For static generation, we'll provide some common category IDs
    // In a real implementation, you might fetch from your API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      const categories = data.data || [];
      
      return categories.map((category: any) => ({
        id: category._id.toString(),
      }));
    }
  } catch (error) {
    console.log('Error fetching categories for static generation:', error);
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

export default function EditCategoryPage({ params }: PageProps) {
  return <EditCategoryClient id={params.id} />;
}
