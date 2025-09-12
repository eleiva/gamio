import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaCarousel from '@/components/ui/MediaCarousel';

describe('MediaCarousel', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    'https://example.com/image4.jpg'
  ];

  it('renders all images', () => {
    render(<MediaCarousel images={mockImages} />);
    
    mockImages.forEach((_, index) => {
      const image = screen.getByAltText(`Game screenshot ${index + 1}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockImages[index]);
    });
  });

  it('applies correct styling to image containers', () => {
    const { container } = render(<MediaCarousel images={mockImages} />);
    
    const imageContainers = container.querySelectorAll('.flex-shrink-0.w-32.h-32');
    expect(imageContainers).toHaveLength(mockImages.length);
    
    imageContainers.forEach(container => {
      expect(container).toHaveClass(
        'flex-shrink-0', 'w-32', 'h-32', 'bg-gray-200', 
        'rounded-lg', 'flex', 'items-center', 'justify-center'
      );
    });
  });

  it('applies correct styling to images', () => {
    render(<MediaCarousel images={mockImages} />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveClass('w-full', 'h-full', 'object-cover', 'rounded-lg');
    });
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-carousel-class';
    const { container } = render(<MediaCarousel images={mockImages} className={customClass} />);
    
    const carousel = container.firstChild as HTMLElement;
    expect(carousel).toHaveClass('relative', customClass);
  });

  it('does not show navigation arrows when images are 4 or fewer', () => {
    render(<MediaCarousel images={mockImages} />);
    
    expect(screen.queryByLabelText(/previous image/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next image/i)).not.toBeInTheDocument();
  });

  it('shows navigation arrows when there are more than 4 images', () => {
    const manyImages = [
      ...mockImages,
      'https://example.com/image5.jpg',
      'https://example.com/image6.jpg'
    ];
    
    render(<MediaCarousel images={manyImages} />);
    
    expect(screen.getByLabelText(/previous image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next image/i)).toBeInTheDocument();
  });

  it('handles empty images array', () => {
    render(<MediaCarousel images={[]} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/previous image/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next image/i)).not.toBeInTheDocument();
  });

  it('handles single image', () => {
    const singleImage = ['https://example.com/single.jpg'];
    render(<MediaCarousel images={singleImage} />);
    
    expect(screen.getByAltText('Game screenshot 1')).toBeInTheDocument();
    expect(screen.queryByLabelText(/previous image/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next image/i)).not.toBeInTheDocument();
  });

  it('navigation buttons have correct styling when visible', () => {
    const manyImages = [
      ...mockImages,
      'https://example.com/image5.jpg',
      'https://example.com/image6.jpg'
    ];
    
    render(<MediaCarousel images={manyImages} />);
    
    const prevButton = screen.getByLabelText(/previous image/i);
    const nextButton = screen.getByLabelText(/next image/i);
    
    expect(prevButton).toHaveClass(
      'absolute', 'left-0', 'top-1/2', '-translate-y-1/2', 
      'bg-white/80', 'hover:bg-white', 'shadow-md'
    );
    
    expect(nextButton).toHaveClass(
      'absolute', 'right-0', 'top-1/2', '-translate-y-1/2', 
      'bg-white/80', 'hover:bg-white', 'shadow-md'
    );
  });

  it('navigation buttons are functional', () => {
    const manyImages = [
      ...mockImages,
      'https://example.com/image5.jpg',
      'https://example.com/image6.jpg'
    ];
    
    render(<MediaCarousel images={manyImages} />);
    
    const prevButton = screen.getByLabelText(/previous image/i);
    const nextButton = screen.getByLabelText(/next image/i);
    
    // Test that buttons are clickable (component uses useState internally)
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    
    // Buttons should remain functional after clicks
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
