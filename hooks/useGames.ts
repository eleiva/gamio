import { useState, useCallback, useMemo } from 'react';
import { Game } from '@/types';
import { useErrorHandler } from './useErrorHandler';

// Sample game data
const initialGames: Game[] = [
  {
    id: 1,
    title: "Dragon Ball Sparking ZERO",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg",
    genre: "Fighting",
    platform: "PC",
    releaseDate: "2024-10-11",
    rating: 4.5,
    isCompleted: false,
    addedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: "Blues Brothers 2000",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2b.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "2024-12-31",
    rating: 3.8,
    isCompleted: false,
    addedAt: new Date('2024-01-16')
  },
  {
    id: 3,
    title: "Silent Hill 2",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2c.jpg",
    genre: "Horror",
    platform: "PC",
    releaseDate: "2024-10-08",
    rating: 4.2,
    isCompleted: true,
    addedAt: new Date('2024-01-17')
  },
  {
    id: 4,
    title: "Off The Grid",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2d.jpg",
    genre: "Battle Royale",
    platform: "PC",
    releaseDate: "2024-09-05",
    rating: 3.5,
    isCompleted: false,
    addedAt: new Date('2024-01-18')
  },
  {
    id: 5,
    title: "Arena Breakout Infinite",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2e.jpg",
    genre: "FPS",
    platform: "Mobile",
    releaseDate: "2024-08-15",
    rating: 4.0,
    isCompleted: false,
    addedAt: new Date('2024-01-19')
  }
];

export const useGames = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { handleError, withErrorHandling } = useErrorHandler({
    onError: (error, context) => {
      setError(error.message);
      console.error(`Error in useGames${context ? ` (${context})` : ''}:`, error);
    },
  });

  // Filter games based on search term
  const filteredGames = useMemo(() => {
    if (!searchTerm.trim()) return games;
    
    return games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.platform?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [games, searchTerm]);

  // Add a new game
  const addGame = useCallback(
    withErrorHandling((game: Omit<Game, 'id' | 'addedAt'>) => {
      const newGame: Game = {
        ...game,
        id: Date.now(), // Simple ID generation
        addedAt: new Date()
      };
      setGames(prev => [...prev, newGame]);
      setError(null); // Clear any previous errors
    }, 'addGame'),
    [withErrorHandling]
  );

  // Delete a game
  const deleteGame = useCallback(
    withErrorHandling((gameId: number) => {
      setGames(prev => prev.filter(game => game.id !== gameId));
      setError(null); // Clear any previous errors
    }, 'deleteGame'),
    [withErrorHandling]
  );

  // Update a game
  const updateGame = useCallback(
    withErrorHandling((updatedGame: Game) => {
      setGames(prev => prev.map(game => 
        game.id === updatedGame.id ? updatedGame : game
      ));
      setError(null); // Clear any previous errors
    }, 'updateGame'),
    [withErrorHandling]
  );

  // Toggle game completion status
  const toggleGameCompletion = useCallback(
    withErrorHandling((gameId: number) => {
      setGames(prev => prev.map(game => 
        game.id === gameId 
          ? { ...game, isCompleted: !game.isCompleted }
          : game
      ));
      setError(null); // Clear any previous errors
    }, 'toggleGameCompletion'),
    [withErrorHandling]
  );

  // Get games by completion status
  const getGamesByStatus = useCallback((isCompleted: boolean) => {
    return games.filter(game => game.isCompleted === isCompleted);
  }, [games]);

  // Get games by genre
  const getGamesByGenre = useCallback((genre: string) => {
    return games.filter(game => game.genre?.toLowerCase() === genre.toLowerCase());
  }, [games]);

  // Get games by platform
  const getGamesByPlatform = useCallback((platform: string) => {
    return games.filter(game => game.platform?.toLowerCase() === platform.toLowerCase());
  }, [games]);

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(games.map(game => game.genre).filter(Boolean));
    return Array.from(genreSet);
  }, [games]);

  // Get unique platforms
  const platforms = useMemo(() => {
    const platformSet = new Set(games.map(game => game.platform).filter(Boolean));
    return Array.from(platformSet);
  }, [games]);

  // Get statistics
  const stats = useMemo(() => {
    const total = games.length;
    const completed = games.filter(game => game.isCompleted).length;
    const inProgress = total - completed;
    const averageRating = games.reduce((sum, game) => sum + (game.rating || 0), 0) / total || 0;

    return {
      total,
      completed,
      inProgress,
      averageRating: Math.round(averageRating * 10) / 10
    };
  }, [games]);

  return {
    games,
    filteredGames,
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
    error,
    setError,
    addGame,
    deleteGame,
    updateGame,
    toggleGameCompletion,
    getGamesByStatus,
    getGamesByGenre,
    getGamesByPlatform,
    genres,
    platforms,
    stats
  };
};
