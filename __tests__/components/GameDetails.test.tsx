import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameDetails from '@/components/GameDetails';
import { Game } from '@/types';

const mockGame: Game = {
  id: 1,
  title: 'Test Game',
  image: 'https://example.com/game.jpg',
  description: 'A test game description',
  genre: 'Action',
  platform: 'PC',
  releaseDate: '2024-01-01',
  rating: 4.5,
  isCompleted: false,
  addedAt: new Date('2024-01-01'),
};

describe('GameDetails', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('renders game information correctly', () => {
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('A test game description')).toBeInTheDocument();
    expect(screen.getByText('Genre: Action')).toBeInTheDocument();
    expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
  });

  it('shows collect button initially', () => {
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    const collectButton = screen.getByRole('button', { name: /collect game/i });
    expect(collectButton).toBeInTheDocument();
    expect(collectButton).toHaveTextContent('Collect game');
  });

  it('collects game when collect button is clicked', () => {
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    const collectButton = screen.getByRole('button', { name: /collect game/i });
    fireEvent.click(collectButton);
    
    // Check that the button text changes
    expect(collectButton).toHaveTextContent('Collected');
    
    // Check that the game is stored in localStorage
    const storedGames = localStorage.getItem('collectedGames');
    expect(storedGames).toBeTruthy();
    
    const parsedGames = JSON.parse(storedGames!);
    const storedGame = parsedGames['1'];
    expect(storedGame.id).toBe(mockGame.id);
    expect(storedGame.title).toBe(mockGame.title);
    expect(storedGame.image).toBe(mockGame.image);
    expect(storedGame.description).toBe(mockGame.description);
    expect(storedGame.genre).toBe(mockGame.genre);
    expect(storedGame.platform).toBe(mockGame.platform);
    expect(storedGame.rating).toBe(mockGame.rating);
  });

  it('uncollects game when collect button is clicked again', () => {
    // First collect the game
    const gamesData = { '1': mockGame };
    localStorage.setItem('collectedGames', JSON.stringify(gamesData));
    
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    const collectButton = screen.getByRole('button', { name: /collected/i });
    expect(collectButton).toHaveTextContent('Collected');
    
    fireEvent.click(collectButton);
    
    // Check that the button text changes back
    expect(collectButton).toHaveTextContent('Collect game');
    
    // Check that the game is removed from localStorage
    const storedGames = localStorage.getItem('collectedGames');
    const parsedGames = storedGames ? JSON.parse(storedGames) : {};
    expect(parsedGames['1']).toBeUndefined();
  });

  it('calls onClose when back button is clicked', () => {
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    const backButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(backButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('shows collected state when game is already collected', () => {
    // Pre-populate localStorage with the game
    const gamesData = { '1': mockGame };
    localStorage.setItem('collectedGames', JSON.stringify(gamesData));
    
    render(<GameDetails game={mockGame} onClose={mockOnClose} />);
    
    const collectButton = screen.getByRole('button', { name: /collected/i });
    expect(collectButton).toHaveTextContent('Collected');
  });
});
