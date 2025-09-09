import { renderHook, act } from '@testing-library/react';
import { useGames } from '@/hooks/useGames';
import { Game } from '@/types';

describe('useGames', () => {
  it('should return initial games and state', () => {
    const { result } = renderHook(() => useGames());
    
    expect(result.current.games).toHaveLength(5);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should filter games based on search term', () => {
    const { result } = renderHook(() => useGames());
    
    act(() => {
      result.current.setSearchTerm('Dragon');
    });
    
    expect(result.current.filteredGames).toHaveLength(1);
    expect(result.current.filteredGames[0].title).toContain('Dragon');
  });

  it('should add a new game', () => {
    const { result } = renderHook(() => useGames());
    const initialLength = result.current.games.length;
    
    const newGame: Omit<Game, 'id' | 'addedAt'> = {
      title: 'New Game',
      image: 'https://example.com/new-game.jpg',
      genre: 'Adventure',
      platform: 'PC',
      releaseDate: '2024-01-01',
      rating: 4.0,
      isCompleted: false,
    };
    
    act(() => {
      result.current.addGame(newGame);
    });
    
    expect(result.current.games).toHaveLength(initialLength + 1);
    expect(result.current.games[result.current.games.length - 1].title).toBe('New Game');
  });

  it('should delete a game', () => {
    const { result } = renderHook(() => useGames());
    const initialLength = result.current.games.length;
    const gameToDelete = result.current.games[0];
    
    act(() => {
      result.current.deleteGame(gameToDelete.id);
    });
    
    expect(result.current.games).toHaveLength(initialLength - 1);
    expect(result.current.games.find(game => game.id === gameToDelete.id)).toBeUndefined();
  });

  it('should toggle game completion status', () => {
    const { result } = renderHook(() => useGames());
    const gameToToggle = result.current.games[0];
    const initialCompletionStatus = gameToToggle.isCompleted;
    
    act(() => {
      result.current.toggleGameCompletion(gameToToggle.id);
    });
    
    const updatedGame = result.current.games.find(game => game.id === gameToToggle.id);
    expect(updatedGame?.isCompleted).toBe(!initialCompletionStatus);
  });

  it('should calculate statistics correctly', () => {
    const { result } = renderHook(() => useGames());
    
    expect(result.current.stats.total).toBe(5);
    expect(result.current.stats.completed).toBe(1); // Silent Hill 2 is completed
    expect(result.current.stats.inProgress).toBe(4);
    expect(result.current.stats.averageRating).toBeGreaterThan(0);
  });
});
