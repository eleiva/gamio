"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import SearchBar from '@/components/SearchBar';
import GamesSection from './GamesSection';
import GamesErrorBoundary from './GamesErrorBoundary';
import GameDetails from './GameDetails';
import ToastContainer from './ui/toast-container';
import ImageWithFallback from './ui/ImageWithFallback';
import { Game, SavedGamesFilter } from '@/types';
import { useIGDB } from '@/hooks/useIGDB';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';


const GamingApp: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [savedGamesFilter, setSavedGamesFilter] = useState<SavedGamesFilter>('lastAdded');
  
  const { searchGames, getPopularGames, isLoading, error } = useIGDB();
  const { toasts, removeToast, showSuccess } = useToast();
  
  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Increased to 500ms
  const searchAbortController = useRef<AbortController | null>(null);

  // Load saved games from localStorage on component mount
  useEffect(() => {
    const loadSavedGames = (): void => {
      const collectedGames = localStorage.getItem('collectedGames');
      if (collectedGames) {
        const gamesData: Record<string, Game> = JSON.parse(collectedGames);
        const savedGames = Object.values(gamesData);
        setGames(savedGames);
      }
    };

    loadSavedGames();
  }, []);

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
          const results = await searchGames(debouncedSearchTerm, 10);
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
  }, [debouncedSearchTerm]);

  // Filter and sort saved games based on selected filter
  const getFilteredSavedGames = (): Game[] => {
    const sortedGames = [...games];
    
    switch (savedGamesFilter) {
      case 'lastAdded':
        // Sort by addedAt date (most recent first)
        return sortedGames.sort((a, b) => {
          const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
          const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
          return dateB - dateA; // Most recent first
        });
      
      case 'newest':
        // Sort by release date (newest first)
        return sortedGames.sort((a, b) => {
          const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          return dateB - dateA; // Newest first
        });
      
      case 'oldest':
        // Sort by release date (oldest first)
        return sortedGames.sort((a, b) => {
          const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          return dateA - dateB; // Oldest first
        });
      
      default:
        return sortedGames;
    }
  };

  const savedGames = getFilteredSavedGames();

  // Handle game deletion
  const handleDeleteGame = (gameId: number): void => {
    const gameToDelete = games.find(game => game.id === gameId);
    
    // Remove from state
    setGames(games.filter(game => game.id !== gameId));
    
    // Remove from localStorage
    const collectedGames = localStorage.getItem('collectedGames');
    if (collectedGames) {
      const gamesData: Record<string, Game> = JSON.parse(collectedGames);
      delete gamesData[gameId.toString()];
      localStorage.setItem('collectedGames', JSON.stringify(gamesData));
    }
    
    if (gameToDelete) {
      showSuccess('Game removed', `${gameToDelete.title} has been removed from your collection`);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Handle search focus - fetch popular games
  const handleSearchFocus = async (): Promise<void> => {
    setIsSearchFocused(true);
    if (popularGames.length === 0 && !isLoading) {
      try {
        const popular = await getPopularGames(10);
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
    // Delay blur to allow clicking on search results
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  // Handle clearing search
  const handleClearSearch = (): void => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };


  // Handle game details view
  const handleGameDetails = (game: Game): void => {
    setSelectedGame(game);
    setIsSearchFocused(false);
  };

  // Handle clicking on saved games
  const handleSavedGameClick = (game: Game): void => {
    handleGameDetails(game);
  };

  // Handle closing game details
  const handleCloseGameDetails = (): void => {
    setSelectedGame(null);
    // Reload saved games in case a game was collected/uncollected
    const collectedGames = localStorage.getItem('collectedGames');
    if (collectedGames) {
      const gamesData: Record<string, Game> = JSON.parse(collectedGames);
      const savedGames = Object.values(gamesData);
      setGames(savedGames);
    } else {
      setGames([]);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: SavedGamesFilter): void => {
    setSavedGamesFilter(filter);
  };

  // If a game is selected, show the game details page
  if (selectedGame) {
    return (
      <div className="min-h-screen p-4 md:p-6 relative">
        {/* Sparkle elements */}
        <div className="sparkle" style={{ top: '20%', left: '10%' }}></div>
        <div className="sparkle" style={{ top: '30%', left: '85%' }}></div>
        <div className="sparkle" style={{ top: '60%', left: '15%' }}></div>
        <div className="sparkle" style={{ top: '70%', left: '80%' }}></div>
        <div className="sparkle" style={{ top: '40%', left: '5%' }}></div>
        <div className="sparkle" style={{ top: '50%', left: '90%' }}></div>
        
        <div className="max-w-6xl mx-auto">
          <GameDetails
            game={selectedGame}
            onClose={handleCloseGameDetails}
            onGameCollected={(game, isCollected) => {
              if (isCollected) {
                showSuccess('Game collected', `${game.title} has been added to your collection`);
              } else {
                showSuccess('Game removed', `${game.title} has been removed from your collection`);
              }
            }}
          />
        </div>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  }

  // Otherwise show the main page
  return (
    <div className="min-h-screen p-4 md:p-6 relative">
      {/* Sparkle elements */}
      <div className="sparkle" style={{ top: '20%', left: '10%' }}></div>
      <div className="sparkle" style={{ top: '30%', left: '85%' }}></div>
      <div className="sparkle" style={{ top: '60%', left: '15%' }}></div>
      <div className="sparkle" style={{ top: '70%', left: '80%' }}></div>
      <div className="sparkle" style={{ top: '40%', left: '5%' }}></div>
      <div className="sparkle" style={{ top: '50%', left: '90%' }}></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header />
        
        {/* Search Section */}
        <div className="relative mb-8">
          <div className="relative">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onClear={handleClearSearch}
              placeholder="Search games..."
              showClearButton={isSearchFocused}
            />
          </div>

          {/* Search Results */}
          {isSearchFocused && searchTerm && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 custom-search-dropdown max-h-80 overflow-y-auto z-50">
              <div className="p-2">
                {searchResults.map((game) => (
                  <button
                    key={game.id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors text-left"
                    onClick={() => handleGameDetails(game)}
                    type="button"
                    aria-label={`View details for ${game.title}`}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover"
                        size={48}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">{game.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{game.genre}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Games */}
          {isSearchFocused && !searchTerm && popularGames.length > 0 && (
            <div className="absolute top-full left-0 right-0 custom-search-dropdown max-h-80 overflow-y-auto z-50">
              <div className="p-2">
                {popularGames.map((game) => (
                  <button
                    key={game.id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors text-left"
                    onClick={() => handleGameDetails(game)}
                    type="button"
                    aria-label={`View details for ${game.title}`}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover"
                        size={48}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">{game.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{game.genre}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading States */}
          {isSearchFocused && searchTerm && isLoading && (
            <div className="absolute top-full left-0 right-0 bg-background border-2 border-pink-300 rounded-b-lg shadow-lg p-4 text-center z-50">
              <p className="text-muted-foreground">Searching games...</p>
            </div>
          )}

          {isSearchFocused && !searchTerm && popularGames.length === 0 && isLoading && (
            <div className="absolute top-full left-0 right-0 bg-background border-2 border-pink-300 rounded-b-lg shadow-lg p-4 text-center z-50">
              <p className="text-muted-foreground">Loading popular games...</p>
            </div>
          )}

          {/* No Results */}
          {isSearchFocused && searchTerm && searchResults.length === 0 && !isLoading && (
            <div className="absolute top-full left-0 right-0 bg-background border-2 border-pink-300 rounded-b-lg shadow-lg p-4 text-center z-50">
              <p className="text-muted-foreground">No games found for &quot;{searchTerm}&quot;</p>
            </div>
          )}

          {isSearchFocused && !searchTerm && popularGames.length === 0 && error && (
            <div className="absolute top-full left-0 right-0 bg-background border-2 border-pink-300 rounded-b-lg shadow-lg p-4 text-center z-50">
              <p className="text-destructive">Failed to load popular games</p>
            </div>
          )}

          {isSearchFocused && searchTerm && error && (
            <div className="absolute top-full left-0 right-0 bg-background border-2 border-pink-300 rounded-b-lg shadow-lg p-4 text-center z-50">
              <p className="text-destructive">Search failed. Please try again.</p>
            </div>
          )}
        </div>
        
        {/* Games Section */}
        <GamesErrorBoundary onRetry={() => window.location.reload()}>
          <GamesSection
            games={savedGames}
            onDeleteGame={handleDeleteGame}
            onGameClick={handleSavedGameClick}
            title="Saved Games"
            showFilters={true}
            currentFilter={savedGamesFilter}
            onFilterChange={handleFilterChange}
          />
        </GamesErrorBoundary>
      </div>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

export default GamingApp;
