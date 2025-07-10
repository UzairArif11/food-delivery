// Debug utility to check image URLs and API configuration

export const debugImageURL = (imagePath: string | null | undefined) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const BASE_URL = API_BASE_URL.replace('/api', '');
  
  console.log('=== Image URL Debug ===');
  console.log('Original image path:', imagePath);
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('BASE_URL:', BASE_URL);
  
  if (!imagePath) {
    console.log('No image path provided');
    return '';
  }
  
  let finalURL = '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    finalURL = imagePath;
    console.log('Absolute URL detected:', finalURL);
  } else if (imagePath.startsWith('/')) {
    finalURL = `${BASE_URL}${imagePath}`;
    console.log('Relative URL from root:', finalURL);
  } else {
    finalURL = `${BASE_URL}/uploads/${imagePath}`;
    console.log('Relative URL, adding uploads prefix:', finalURL);
  }
  
  console.log('Final URL:', finalURL);
  console.log('=== End Debug ===');
  
  return finalURL;
};

export const testImageAccess = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    console.log('Image access test:', {
      url: imageUrl,
      status: response.status,
      accessible: response.ok
    });
    return response.ok;
  } catch (error) {
    console.error('Image access test failed:', error);
    return false;
  }
};

export const debugAPIConfig = () => {
  console.log('=== API Configuration Debug ===');
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  console.log('Current location:', window.location.origin);
  console.log('=== End Debug ===');
};
