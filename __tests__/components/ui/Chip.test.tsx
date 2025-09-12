import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from '@/components/ui/Chip';

describe('Chip', () => {
  const mockIcon = <span data-testid="test-icon">★</span>;
  
  it('renders with correct label and value', () => {
    render(<Chip icon={mockIcon} label="Rating" value="4.5" />);
    
    expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    const { container } = render(<Chip icon={mockIcon} label="Genre" value="Action" />);
    
    const chipElement = container.firstChild as HTMLElement;
    expect(chipElement).toHaveClass(
      'flex', 'items-center', 'gap-3', 'px-4', 'py-2', 
      'bg-gray-50', 'rounded-full', 'border', 'border-gray-100'
    );
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-chip-class';
    const { container } = render(
      <Chip icon={mockIcon} label="Release" value="2024" className={customClass} />
    );
    
    const chipElement = container.firstChild as HTMLElement;
    expect(chipElement).toHaveClass(customClass);
  });

  it('renders icon in correct container', () => {
    render(<Chip icon={mockIcon} label="Platform" value="PC" />);
    
    const iconContainer = screen.getByTestId('test-icon').parentElement;
    expect(iconContainer).toHaveClass('text-violet-900');
  });

  it('renders text with correct styling', () => {
    render(<Chip icon={mockIcon} label="Tag" value="RPG" />);
    
    const textElement = screen.getByText('Tag: RPG');
    expect(textElement).toHaveClass('text-violet-900', 'font-medium', 'text-sm');
  });

  it('handles different label and value combinations', () => {
    const { rerender } = render(<Chip icon={mockIcon} label="Score" value="9.2" />);
    expect(screen.getByText('Score: 9.2')).toBeInTheDocument();

    rerender(<Chip icon={mockIcon} label="Developer" value="Epic Games" />);
    expect(screen.getByText('Developer: Epic Games')).toBeInTheDocument();
  });
});
