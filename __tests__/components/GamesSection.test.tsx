import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GamesSection from '@/components/GamesSection';
import { Game, SavedGamesFilter } from '@/types';

const mockGames: Game[] = [
  {
    id: 1,
    title: 'Test Game 1',
    image: 'https://example.com/game1.jpg',
    genre: 'Action',
    platform: 'PC',
    releaseDate: '2024-01-01',
    rating: 4.5,
    isCompleted: false,
    addedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    title: 'Test Game 2',
    image: 'https://example.com/game2.jpg',
    genre: 'RPG',
    platform: 'PS5',
    releaseDate: '2024-02-01',
    rating: 4.8,
    isCompleted: false,
    addedAt: new Date('2024-02-01'),
  },
];

describe('GamesSection', () => {
  const mockOnDeleteGame = jest.fn();
  const mockOnGameClick = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnDeleteGame.mockClear();
    mockOnGameClick.mockClear();
    mockOnFilterChange.mockClear();
  });

  it('renders games section with title', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
        title="Test Games"
      />
    );
    
    expect(screen.getByText('Test Games')).toBeInTheDocument();
    expect(screen.getByAltText('Test Game 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Game 2')).toBeInTheDocument();
  });

  it('renders with default title when not provided', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
      />
    );
    
    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  it('renders empty state when no games', () => {
    render(
      <GamesSection
        games={[]}
        onDeleteGame={mockOnDeleteGame}
        title="Empty Section"
      />
    );
    
    expect(screen.getByText('Empty Section')).toBeInTheDocument();
    expect(screen.getByText('Nothing collected yet')).toBeInTheDocument();
    expect(screen.getByText('🎮')).toBeInTheDocument();
  });

  it('calls onDeleteGame when delete button is clicked', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
      />
    );
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDeleteGame).toHaveBeenCalledWith(1);
  });

  it('calls onGameClick when game card is clicked', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
        onGameClick={mockOnGameClick}
      />
    );
    
    const gameImages = screen.getAllByAltText(/test game/i);
    const gameCard = gameImages[0].closest('[role="button"], button, div[class*="cursor-pointer"]')!;
    fireEvent.click(gameCard);
    
    expect(mockOnGameClick).toHaveBeenCalledWith(mockGames[0]);
  });

  it('works without onGameClick handler', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
      />
    );
    
    const gameImages = screen.getAllByAltText(/test game/i);
    const gameCard = gameImages[0].closest('[role="button"], button, div[class*="cursor-pointer"]')!;
    fireEvent.click(gameCard);
    
    // Should not throw error
    expect(mockOnGameClick).not.toHaveBeenCalled();
  });

  it('renders correct number of game cards', () => {
    render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
      />
    );
    
    const gameImages = screen.getAllByAltText(/test game/i);
    expect(gameImages).toHaveLength(2);
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <GamesSection
        games={mockGames}
        onDeleteGame={mockOnDeleteGame}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  describe('Filter functionality', () => {
    it('renders filter buttons when showFilters is true', () => {
      render(
        <GamesSection
          games={mockGames}
          onDeleteGame={mockOnDeleteGame}
          showFilters={true}
          currentFilter="lastAdded"
          onFilterChange={mockOnFilterChange}
        />
      );
      
      expect(screen.getByText('Last added')).toBeInTheDocument();
      expect(screen.getByText('Newest')).toBeInTheDocument();
      expect(screen.getByText('Oldest')).toBeInTheDocument();
    });

    it('does not render filter buttons when showFilters is false', () => {
      render(
        <GamesSection
          games={mockGames}
          onDeleteGame={mockOnDeleteGame}
          showFilters={false}
        />
      );
      
      expect(screen.queryByText('Last added')).not.toBeInTheDocument();
      expect(screen.queryByText('Newest')).not.toBeInTheDocument();
      expect(screen.queryByText('Oldest')).not.toBeInTheDocument();
    });

    it('calls onFilterChange when filter button is clicked', () => {
      render(
        <GamesSection
          games={mockGames}
          onDeleteGame={mockOnDeleteGame}
          showFilters={true}
          currentFilter="lastAdded"
          onFilterChange={mockOnFilterChange}
        />
      );
      
      const newestButton = screen.getByText('Newest');
      fireEvent.click(newestButton);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith('newest');
    });

    it('highlights the current filter button', () => {
      render(
        <GamesSection
          games={mockGames}
          onDeleteGame={mockOnDeleteGame}
          showFilters={true}
          currentFilter="newest"
          onFilterChange={mockOnFilterChange}
        />
      );
      
      const newestButton = screen.getByText('Newest');
      expect(newestButton).toHaveClass('bg-primary');
    });
  });
});
