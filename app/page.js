"use client";

import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

// Sample game data
const initialGames = [
  {
    id: 1,
    title: "Dragon Ball Sparking ZERO",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg"
  },
  {
    id: 2,
    title: "Blues Brothers 2000",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2b.jpg"
  },
  {
    id: 3,
    title: "Silent Hill 2",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2c.jpg"
  },
  {
    id: 4,
    title: "Off The Grid",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2d.jpg"
  },
  {
    id: 5,
    title: "Arena Breakout Infinite",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2e.jpg"
  },
  {
    id: 6,
    title: "Dragon Ball Sparking ZERO",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg"
  }
];

export default function Home() {
  const [games, setGames] = useState(initialGames);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle game deletion
  const handleDeleteGame = (gameId) => {
    setGames(games.filter(game => game.id !== gameId));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
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
  );
}