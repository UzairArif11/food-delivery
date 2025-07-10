import React, { useState, useEffect } from 'react';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUtils';

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(getImageUrl(src));
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImageSrc(getImageUrl(src));
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else {
        setImageSrc(getPlaceholderImage());
      }
      if (onError) {
        onError();
      }
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
