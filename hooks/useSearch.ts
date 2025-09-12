import { useState, useEffect, useRef } from 'react';
import { Game } from '@/types';
import { useIGDB } from './useIGDB';
import { useDebounce } from './useDebounce';
import { SEARCH_RESULTS_LIMIT, isMobileDevice } from '@/lib/utils';

interface UseSearchProps {
  onGameSelect: (game: Game) => void;
}

export const useSearch = ({ onGameSelect }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  
  const { searchGames, getPopularGames, isLoading, error } = useIGDB();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchAbortController = useRef<AbortController | null>(null);

  // Handle debounced search
  useEffect(() => {
    const performSearch = async (): Promise<void> => {
      // Cancel previous request if it exists
      const currentController = searchAbortController.current;
      if (currentController) {
        currentController.abort();
      }
      
      if (debouncedSearchTerm.trim().length >= 2) {
        try {
          const results = await searchGames(debouncedSearchTerm, SEARCH_RESULTS_LIMIT);
          setSearchResults(results || []);
        } catch (err) {
          if (err instanceof Error && err.name === 'AbortError') {
            return;
          }
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
    
    // Cleanup function to cancel request on unmount
    return () => {
      const currentController = searchAbortController.current;
      if (currentController) {
        currentController.abort();
      }
    };
  }, [debouncedSearchTerm, searchGames]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Handle search focus - fetch popular games
  const handleSearchFocus = async (): Promise<void> => {
    setIsSearchFocused(true);
    if (popularGames.length === 0 && !isLoading) {
      try {
        const popular = await getPopularGames(SEARCH_RESULTS_LIMIT);
        if (popular) {
          setPopularGames(popular);
        }
      } catch (err) {
        // Failed to fetch popular games
      }
    }
  };

  // Handle search blur
  const handleSearchBlur = (): void => {
    setIsSearchFocused(false);
  };

  // Handle clearing search
  const handleClearSearch = (): void => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  // Handle game selection
  const handleGameSelect = (game: Game): void => {
    onGameSelect(game);
    setIsSearchFocused(false);
    
    // Scroll to top when selecting a game - mobile-optimized approach
    const scrollToTop = () => {
      const isMobile = isMobileDevice();
      
      // Use requestAnimationFrame for better timing with browser rendering
      requestAnimationFrame(() => {
        try {
          if (isMobile) {
            // Mobile-specific approach: Use instant scroll for better reliability
            window.scrollTo(0, 0);
            // Also try direct assignment for stubborn mobile browsers
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          } else {
            // Desktop: Try smooth scroll first
            if ('scrollBehavior' in document.documentElement.style) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo(0, 0);
            }
          }
        } catch (error) {
          // Fallback: Direct scrollTop assignment
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      });
    };
    
    // Small delay to ensure dropdown closes first
    setTimeout(scrollToTop, isMobileDevice() ? 100 : 50);
  };

  return {
    // State
    searchTerm,
    searchResults,
    popularGames,
    isSearchFocused,
    isLoading,
    error,
    
    // Handlers
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    handleClearSearch,
    handleGameSelect,
  };
};
