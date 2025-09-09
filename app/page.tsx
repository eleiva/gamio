"use client";

import React, { useState } from 'react';
import { Search, Trash2, X } from 'lucide-react';
import { Game } from '@/types';
import ErrorBoundary from '@/components/ErrorBoundary';

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
  },
  {
    id: 6,
    title: "Dragon Ball Sparking ZERO",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg",
    genre: "Fighting",
    platform: "PC",
    releaseDate: "2024-10-11",
    rating: 4.5,
    isCompleted: false,
    addedAt: new Date('2024-01-20')
  },
  {
    id: 7,
    title: "Grand Theft Auto San Andreas",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "2004-10-26",
    rating: 4.7,
    isCompleted: false,
    addedAt: new Date('2024-01-21')
  },
  {
    id: 8,
    title: "Grand Theft Auto V",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "2013-09-17",
    rating: 4.8,
    isCompleted: false,
    addedAt: new Date('2024-01-22')
  },
  {
    id: 9,
    title: "Grand Theft Auto IV",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3xqw.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "2008-04-29",
    rating: 4.6,
    isCompleted: false,
    addedAt: new Date('2024-01-23')
  },
  {
    id: 10,
    title: "Grand Theft Auto III",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xqw.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "2001-10-22",
    rating: 4.4,
    isCompleted: false,
    addedAt: new Date('2024-01-24')
  },
  {
    id: 11,
    title: "Grand Theft Auto",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg",
    genre: "Action",
    platform: "PC",
    releaseDate: "1997-11-21",
    rating: 4.2,
    isCompleted: false,
    addedAt: new Date('2024-01-25')
  }
];

export default function Home(): React.JSX.Element {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get search results from all available games
  const searchResults = initialGames.filter(game =>
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

  // Handle clearing search
  const handleClearSearch = (): void => {
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  // Handle search focus
  const handleSearchFocus = (): void => {
    setIsSearchFocused(true);
  };

  // Handle search blur
  const handleSearchBlur = (): void => {
    // Delay blur to allow clicking on search results
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
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

  return (
    <ErrorBoundary>
      <div className="app-layout">
        <div className="container">
          {/* Header */}
          <header className="header">
            <h1 className="header__title">
              Gamio
            </h1>
          </header>
          
          {/* Search Section */}
          <div className="search-section">
            <div className={`search-container ${(isSearchFocused && searchTerm) ? 'search-active' : ''}`}>
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="search-input"
                aria-label="Search games"
              />
              {searchTerm && (
                <button
                  className="search-clear"
                  onClick={handleClearSearch}
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="search-clear-icon" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {isSearchFocused && searchTerm && searchResults.length > 0 && (
              <div className="search-results">
                <ul className="search-results-list">
                  {searchResults.map((game) => (
                    <li key={game.id} className="search-result-item">
                      <button
                        className="search-result-button"
                        onClick={() => handleGameSelect(game)}
                        type="button"
                      >
                        <div className="search-result-image">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="search-result-img"
                          />
                        </div>
                        <span className="search-result-title">{game.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No Results */}
            {isSearchFocused && searchTerm && searchResults.length === 0 && (
              <div className="search-no-results">
                <p>No games found for "{searchTerm}"</p>
              </div>
            )}
          </div>
          
          {/* Games Section */}
          <section className="games-section">
            <h2 className="games-section__title">
              Saved Games
            </h2>
            
            {/* Game Cards Grid */}
            <div className="games-grid">
              {filteredGames.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-card__image-container">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="game-card__image"
                      loading="lazy"
                    />
                    <button
                      className="game-card__delete-button"
                      onClick={() => handleDeleteGame(game.id)}
                      aria-label={`Delete ${game.title}`}
                      type="button"
                    >
                      <Trash2 className="game-card__delete-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ErrorBoundary>
  );
}