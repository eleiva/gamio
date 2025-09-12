"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import GamesSection from './GamesSection';
import GamesErrorBoundary from './GamesErrorBoundary';
import ToastContainer from './ui/ToastContainer';
import StickyFilterBar from './ui/StickyFilterBar';
import { Game, SavedGamesFilter } from '@/types';
import { useToast } from '@/hooks/useToast';
import { useSearch } from '@/hooks/useSearch';

// Dynamic import for GameDetails to enable code splitting
const GameDetails = React.lazy(() => import('./GameDetails'));


const GamingApp: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [savedGamesFilter, setSavedGamesFilter] = useState<SavedGamesFilter>('lastAdded');
  const [isLoadingSavedGames, setIsLoadingSavedGames] = useState<boolean>(true);
  const [showStickyFilter, setShowStickyFilter] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Search functionality
  const searchHook = useSearch({
    onGameSelect: (game: Game) => setSelectedGame(game)
  });

  // Load saved games from localStorage on component mount
  useEffect(() => {
    const loadSavedGames = (): void => {
      const collectedGames = localStorage.getItem('collectedGames');
      if (collectedGames) {
        const gamesData: Record<string, Game> = JSON.parse(collectedGames);
        const savedGames = Object.values(gamesData);
        setGames(savedGames);
      }
      setIsLoadingSavedGames(false);
    };

    loadSavedGames();
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768; // md breakpoint
      setIsMobile(isMobileDevice);
      console.log('Mobile detection:', { width: window.innerWidth, isMobile: isMobileDevice });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


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

  // Handle game details view
  const handleGameDetails = (game: Game): void => {
    setSelectedGame(game);
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
          <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
            <GameDetails
              game={selectedGame}
              onClose={handleCloseGameDetails}
              onGameCollected={(game, isCollected) => {
                if (isCollected) {
                  showSuccess('Game collected', `${game.title} has been added to your collection`);
                  // Clear search input when a game is collected
                  searchHook.handleClearSearch();
                } else {
                  showError('Game removed', `${game.title} has been removed from your collection`);
                }
              }}
            />
          </Suspense>
        </div>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  }

  // Otherwise show the main page
  return (
    <div className={`min-h-screen p-4 md:p-6 relative ${showStickyFilter ? "pt-20 md:pt-4" : ""}`}>
      {/* Sparkle elements */}
      <div className="sparkle" style={{ top: '20%', left: '10%' }}></div>
      <div className="sparkle" style={{ top: '30%', left: '85%' }}></div>
      <div className="sparkle" style={{ top: '60%', left: '15%' }}></div>
      <div className="sparkle" style={{ top: '70%', left: '80%' }}></div>
      <div className="sparkle" style={{ top: '40%', left: '5%' }}></div>
      <div className="sparkle" style={{ top: '50%', left: '90%' }}></div>
      
      {/* Sticky Filter Bar - Mobile Only */}
      {showStickyFilter && isMobile && (
        <StickyFilterBar
          currentFilter={savedGamesFilter}
          onFilterChange={handleFilterChange}
        />
      )}
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 text-xs rounded">
          Mobile: {isMobile ? 'Yes' : 'No'} | Sticky: {showStickyFilter ? 'Yes' : 'No'} | Games: {games.length}
        </div>
      )}
      
      <main className="max-w-6xl mx-auto" role="main">
        {/* Header */}
        <Header />
        
        {/* Search Section */}
        <section className="relative mb-8 md:mb-16" aria-label="Game search">
          <SearchBar
            value={searchHook.searchTerm}
            onChange={searchHook.handleSearchChange}
            onFocus={searchHook.handleSearchFocus}
            onBlur={searchHook.handleSearchBlur}
            onClear={searchHook.handleClearSearch}
            onGameSelect={searchHook.handleGameSelect}
            placeholder="Search games..."
            showClearButton={searchHook.isSearchFocused}
            searchResults={searchHook.searchResults}
            popularGames={searchHook.popularGames}
            isSearchFocused={searchHook.isSearchFocused}
            isLoading={searchHook.isLoading}
            error={searchHook.error}
          />
        </section>
        
        {/* Games Section */}
        <section aria-label="Saved games collection">
          <GamesErrorBoundary onRetry={() => window.location.reload()}>
            <GamesSection
              games={savedGames}
              onDeleteGame={handleDeleteGame}
              onGameClick={handleSavedGameClick}
              title="Saved Games"
              showFilters={true}
              currentFilter={savedGamesFilter}
              onFilterChange={handleFilterChange}
              isLoading={isLoadingSavedGames}
              onStickyFilterChange={isMobile ? setShowStickyFilter : undefined}
            />
          </GamesErrorBoundary>
        </section>
      </main>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

export default GamingApp;
