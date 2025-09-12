import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface MediaCarouselProps {
  images: string[];
  className?: string;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <img 
              src={image}
              alt={`Game screenshot ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows - only show if there are more than 4 images */}
      {images.length > 4 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default MediaCarousel;
