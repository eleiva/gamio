"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import SearchBar from '@/components/SearchBar';
import GamesSection from './GamesSection';
import GamesErrorBoundary from './GamesErrorBoundary';
import GameDetails from './GameDetails';
import ToastContainer from './ui/toast-container';
import ImageWithFallback from './ui/ImageWithFallback';
import { Game } from '@/types';
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

  // Saved games should never be filtered by search - they are always shown as-is
  const savedGames = games;

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

  // If a game is selected, show the game details page
  if (selectedGame) {
    return (
      <div className="app-layout">
        <div className="container">
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
    <div className="app-layout">
      <div className="container">
        {/* Header */}
        <Header />
        
        {/* Search Section */}
        <div className="search-section">
          <div className={`search-container ${(isSearchFocused && (searchTerm || popularGames.length > 0)) ? 'search-active' : ''}`}>
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
            <div className="search-results">
              <ul className="search-results-list">
                {searchResults.map((game) => (
                  <li key={game.id} className="search-result-item">
                    <button
                      className="search-result-button"
                      onClick={() => handleGameDetails(game)}
                      type="button"
                      aria-label={`View details for ${game.title}`}
                    >
                      <div className="search-result-image">
                        <ImageWithFallback
                          src={game.image}
                          alt={game.title}
                          className="search-result-img"
                          size={48}
                        />
                      </div>
                      <div className="search-result-info">
                        <span className="search-result-title">{game.title}</span>
                        <span className="search-result-genre">{game.genre}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Popular Games */}
          {isSearchFocused && !searchTerm && popularGames.length > 0 && (
            <div className="search-results">
              <ul className="search-results-list">
                {popularGames.map((game) => (
                  <li key={game.id} className="search-result-item">
                    <button
                      className="search-result-button"
                      onClick={() => handleGameDetails(game)}
                      type="button"
                      aria-label={`View details for ${game.title}`}
                    >
                      <div className="search-result-image">
                        <ImageWithFallback
                          src={game.image}
                          alt={game.title}
                          className="search-result-img"
                          size={48}
                        />
                      </div>
                      <div className="search-result-info">
                        <span className="search-result-title">{game.title}</span>
                        <span className="search-result-genre">{game.genre}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Loading States */}
          {isSearchFocused && searchTerm && isLoading && (
            <div className="search-no-results">
              <p>Searching games...</p>
            </div>
          )}

          {isSearchFocused && !searchTerm && popularGames.length === 0 && isLoading && (
            <div className="search-no-results">
              <p>Loading popular games...</p>
            </div>
          )}

          {/* No Results */}
          {isSearchFocused && searchTerm && searchResults.length === 0 && !isLoading && (
            <div className="search-no-results">
              <p>No games found for &quot;{searchTerm}&quot;</p>
            </div>
          )}

          {isSearchFocused && !searchTerm && popularGames.length === 0 && error && (
            <div className="search-no-results">
              <p>Failed to load popular games</p>
            </div>
          )}

          {isSearchFocused && searchTerm && error && (
            <div className="search-no-results">
              <p>Search failed. Please try again.</p>
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
          />
        </GamesErrorBoundary>
      </div>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

export default GamingApp;
