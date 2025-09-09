import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameCard from '@/components/GameCard';
import { Game } from '@/types';

const mockGame: Game = {
  id: 1,
  title: 'Test Game',
  image: 'https://example.com/game.jpg',
  genre: 'Action',
  platform: 'PC',
  releaseDate: '2024-01-01',
  rating: 4.5,
  isCompleted: false,
  addedAt: new Date('2024-01-01'),
};

describe('GameCard', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} onDelete={mockOnDelete} />);
    
    expect(screen.getByAltText('Test Game')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete test game/i })).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<GameCard game={mockGame} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete test game/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('has proper accessibility attributes', () => {
    render(<GameCard game={mockGame} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete test game/i });
    expect(deleteButton).toHaveAttribute('type', 'button');
    expect(deleteButton).toHaveAttribute('aria-label', 'Delete Test Game');
  });
});
