import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectButton from '@/components/ui/CollectButton';

describe('CollectButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders in uncollected state by default', () => {
    render(<CollectButton isCollected={false} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: /add to collection/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Collect game');
    expect(button).toHaveClass('bg-violet-900', 'text-white');
  });

  it('renders in collected state when isCollected is true', () => {
    render(<CollectButton isCollected={true} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: /remove from collection/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Game collected');
    expect(button).toHaveClass('bg-white', 'text-violet-600', 'border', 'border-violet-200');
  });

  it('calls onClick when clicked', () => {
    render(<CollectButton isCollected={false} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: /add to collection/i });
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling classes for uncollected state', () => {
    const { container } = render(<CollectButton isCollected={false} onClick={mockOnClick} />);
    
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass(
      'flex', 'items-center', 'justify-center', 'gap-2', 'px-6', 'py-3',
      'rounded-full', 'font-semibold', 'text-sm', 'transition-all', 'duration-200',
      'w-full', 'md:w-auto', 'md:min-w-[140px]', 'bg-violet-900', 'text-white', 'hover:bg-violet-800'
    );
  });

  it('applies correct styling classes for collected state', () => {
    const { container } = render(<CollectButton isCollected={true} onClick={mockOnClick} />);
    
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass(
      'flex', 'items-center', 'justify-center', 'gap-2', 'px-6', 'py-3',
      'rounded-full', 'font-semibold', 'text-sm', 'transition-all', 'duration-200',
      'w-full', 'md:w-auto', 'md:min-w-[140px]', 'bg-white', 'text-violet-600',
      'border', 'border-violet-200', 'hover:bg-violet-50', 'hover:text-violet-700'
    );
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-button-class';
    const { container } = render(
      <CollectButton isCollected={false} onClick={mockOnClick} className={customClass} />
    );
    
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass(customClass);
  });

  it('renders heart icon with correct styling', () => {
    const { container } = render(<CollectButton isCollected={false} onClick={mockOnClick} />);
    
    const heartIcon = container.querySelector('svg');
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveClass('h-4', 'w-4');
  });

  it('renders heart icon filled when collected', () => {
    const { container } = render(<CollectButton isCollected={true} onClick={mockOnClick} />);
    
    const heartIcon = container.querySelector('svg');
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveClass('h-4', 'w-4', 'fill-current');
  });

  it('has correct aria-label for accessibility', () => {
    const { rerender } = render(<CollectButton isCollected={false} onClick={mockOnClick} />);
    
    let button = screen.getByRole('button', { name: /add to collection/i });
    expect(button).toHaveAttribute('aria-label', 'Add to collection');

    rerender(<CollectButton isCollected={true} onClick={mockOnClick} />);
    button = screen.getByRole('button', { name: /remove from collection/i });
    expect(button).toHaveAttribute('aria-label', 'Remove from collection');
  });
});
