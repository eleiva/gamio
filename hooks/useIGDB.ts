import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { IGDBResponse, Game } from '@/types';
import { convertIGDBGamesToGames } from '@/lib/igdb-utils';

export const useIGDB = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { withErrorHandling } = useErrorHandler({
    onError: (error, context) => {
      setError(error.message);
      console.error(`Error in useIGDB${context ? ` (${context})` : ''}:`, error);
    },
  });

  const searchGames = useCallback(
    withErrorHandling(async (query: string, limit: number = 10): Promise<Game[]> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/igdb/search', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ query, limit })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to search games');
        }

        const data: IGDBResponse = await response.json();
        
        if (!data.success) {
          throw new Error('API returned unsuccessful response');
        }

        // Convert IGDB games to our Game format
        const games = convertIGDBGamesToGames(data.data);
        setIsLoading(false);
        return games;
        
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }, 'searchGames'),
    [withErrorHandling]
  );

  const getPopularGames = useCallback(
    withErrorHandling(async (limit: number = 20, offset: number = 0): Promise<Game[]> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/igdb/games?limit=${limit}&offset=${offset}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch popular games');
        }

        const data: IGDBResponse = await response.json();
        
        if (!data.success) {
          throw new Error('API returned unsuccessful response');
        }

        // Convert IGDB games to our Game format
        const games = convertIGDBGamesToGames(data.data);
        setIsLoading(false);
        return games;
        
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }, 'getPopularGames'),
    [withErrorHandling]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    searchGames,
    getPopularGames,
    isLoading,
    error,
    clearError
  };
};
