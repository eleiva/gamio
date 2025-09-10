import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButtons from '@/components/ui/filter-buttons';
import { SavedGamesFilter } from '@/types';

describe('FilterButtons', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter buttons', () => {
    render(
      <FilterButtons
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
      <FilterButtons
        currentFilter="newest"
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const newestButton = screen.getByText('Newest');
    const lastAddedButton = screen.getByText('Last added');
    const oldestButton = screen.getByText('Oldest');
    
    expect(newestButton).toHaveClass('bg-primary');
    expect(lastAddedButton).toHaveClass('border');
    expect(oldestButton).toHaveClass('border');
  });

  it('calls onFilterChange when a button is clicked', () => {
    render(
      <FilterButtons
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
      <FilterButtons
        currentFilter="lastAdded"
        onFilterChange={mockOnFilterChange}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles all filter types correctly', () => {
    const filters: SavedGamesFilter[] = ['lastAdded', 'newest', 'oldest'];
    
    filters.forEach(filter => {
      const { unmount } = render(
        <FilterButtons
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
      
      expect(currentButton).toHaveClass('bg-primary');
      
      unmount();
    });
  });
});
