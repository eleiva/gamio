import React, { useState } from 'react';
import NoImageIcon from './NoImageIcon';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  size?: number;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  size = 24,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  if (imageError || !src) {
    return (
      <div className={`no-image-placeholder ${fallbackClassName}`}>
        <NoImageIcon size={size} />
        <span className="no-image-text">No image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      style={{ display: imageLoaded ? 'block' : 'none' }}
    />
  );
};

export default ImageWithFallback;
