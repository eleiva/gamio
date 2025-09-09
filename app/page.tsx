"use client";

import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
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
  }
];

export default function Home(): React.JSX.Element {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchTerm, setSearchTerm] = useState<string>('');

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
          
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              aria-label="Search games"
            />
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