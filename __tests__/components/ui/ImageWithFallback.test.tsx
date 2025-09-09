import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image when src is provided and loads successfully', () => {
    render(
      <ImageWithFallback
        src="https://example.com/image.jpg"
        alt="Test image"
        className="test-image"
      />
    );
    
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveClass('test-image');
  });

  it('shows fallback when image fails to load', () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken-image.jpg"
        alt="Test image"
        className="test-image"
      />
    );
    
    // Simulate image load error
    const image = screen.getByAltText('Test image');
    fireEvent.error(image);
    
    expect(screen.getByText('No image')).toBeInTheDocument();
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });

  it('shows fallback when src is empty', () => {
    render(
      <ImageWithFallback
        src=""
        alt="Test image"
        className="test-image"
      />
    );
    
    expect(screen.getByText('No image')).toBeInTheDocument();
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });

  it('applies custom size to fallback icon', () => {
    render(
      <ImageWithFallback
        src=""
        alt="Test image"
        size={32}
      />
    );
    
    const svg = screen.getByText('No image').closest('.no-image-placeholder')?.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('applies custom className to fallback', () => {
    render(
      <ImageWithFallback
        src=""
        alt="Test image"
        fallbackClassName="custom-fallback"
      />
    );
    
    expect(screen.getByText('No image').closest('.no-image-placeholder')).toHaveClass('custom-fallback');
  });
});
