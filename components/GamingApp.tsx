"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Header from './Header';
import SearchBar from '@/components/SearchBar';
import GamesSection from './GamesSection';
import GamesErrorBoundary from './GamesErrorBoundary';
import GameDetails from './GameDetails';
import { Game } from '@/types';
import { useIGDB } from '@/hooks/useIGDB';

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

const GamingApp: React.FC = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  const { getPopularGames, isLoading, error } = useIGDB();

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle game deletion
  const handleDeleteGame = (gameId: number): void => {
    setGames(games.filter(game => game.id !== gameId));
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
        console.error('Failed to fetch popular games:', err);
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
    setIsSearchFocused(false);
  };

  // Handle game selection from search
  const handleGameSelect = (game: Game): void => {
    // Add game to saved games if not already present
    if (!games.find(g => g.id === game.id)) {
      setGames([...games, game]);
    }
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  // Handle game details view
  const handleGameDetails = (game: Game): void => {
    setSelectedGame(game);
    setIsSearchFocused(false);
  };

  // Handle closing game details
  const handleCloseGameDetails = (): void => {
    setSelectedGame(null);
  };

  // If a game is selected, show the game details page
  if (selectedGame) {
    return (
      <div className="app-layout">
        <div className="container">
          <GameDetails
            game={selectedGame}
            onClose={handleCloseGameDetails}
          />
        </div>
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
          <div className={`search-container ${(isSearchFocused && searchTerm) ? 'search-active' : ''}`}>
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
                        <img
                          src={game.image}
                          alt={game.title}
                          className="search-result-img"
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
              <div className="search-results-footer">
                <button
                  className="search-results-close"
                  onClick={() => setIsSearchFocused(false)}
                  type="button"
                  aria-label="Close search results"
                >
                  <X className="search-results-close-icon" />
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {isSearchFocused && !searchTerm && popularGames.length === 0 && isLoading && (
            <div className="search-no-results">
              <p>Loading popular games...</p>
            </div>
          )}

          {isSearchFocused && !searchTerm && popularGames.length === 0 && error && (
            <div className="search-no-results">
              <p>Failed to load popular games</p>
            </div>
          )}
        </div>
        
        {/* Games Section */}
        <GamesErrorBoundary onRetry={() => window.location.reload()}>
          <GamesSection
            games={filteredGames}
            onDeleteGame={handleDeleteGame}
            title="Saved Games"
          />
        </GamesErrorBoundary>
      </div>
    </div>
  );
};

export default GamingApp;
