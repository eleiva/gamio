import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StickyFilterBar from '@/components/ui/StickyFilterBar';
import { SavedGamesFilter } from '@/types';

describe('StickyFilterBar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter buttons', () => {
    render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByText('Last added')).toBeInTheDocument();
    expect(screen.getByText('Newest')).toBeInTheDocument();
    expect(screen.getByText('Oldest')).toBeInTheDocument();
  });

  it('highlights the current filter button', () => {
    render(
      <StickyFilterBar
        currentFilter="newest"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const newestButton = screen.getByText('Newest');
    const lastAddedButton = screen.getByText('Last added');
    const oldestButton = screen.getByText('Oldest');
    
    expect(newestButton).toHaveClass('violet-button-active');
    expect(lastAddedButton).toHaveClass('violet-button-inactive');
    expect(oldestButton).toHaveClass('violet-button-inactive');
  });

  it('calls onFilterChange when a button is clicked', () => {
    render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const newestButton = screen.getByText('Newest');
    fireEvent.click(newestButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('newest');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct sticky positioning classes', () => {
    const { container } = render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass('fixed');
    expect(stickyBar).toHaveClass('top-0');
    expect(stickyBar).toHaveClass('left-0');
    expect(stickyBar).toHaveClass('right-0');
    expect(stickyBar).toHaveClass('z-50');
    expect(stickyBar).toHaveClass('md:hidden');
  });

  it('has backdrop blur and background styling', () => {
    const { container } = render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass('bg-white/90');
    expect(stickyBar).toHaveClass('backdrop-blur-md');
    expect(stickyBar).toHaveClass('border-b');
    expect(stickyBar).toHaveClass('border-gray-200/50');
    expect(stickyBar).toHaveClass('shadow-sm');
  });

  it('handles all filter types correctly', () => {
    const filters: SavedGamesFilter[] = ['lastAdded', 'newest', 'oldest'];
    
    filters.forEach(filter => {
      const { unmount } = render(
        <StickyFilterBar
          currentFilter={filter}
          onFilterChange={mockOnFilterChange}
        />
      );
      
      // Check that the current filter is highlighted
      const buttons = screen.getAllByRole('button');
      const currentButton = buttons.find(button => 
        button.textContent === 
        (filter === 'lastAdded' ? 'Last added' : 
         filter === 'newest' ? 'Newest' : 'Oldest')
      );
      
      expect(currentButton).toHaveClass('violet-button-active');
      
      unmount();
    });
  });

  it('has touch-friendly styling for mobile', () => {
    render(
      <StickyFilterBar
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('touch-manipulation');
    });
  });
});
