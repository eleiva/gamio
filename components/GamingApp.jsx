"use client";

import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import GamesSection from './GamesSection';

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
  }
];

const GamingApp = () => {
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
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <Header />
        
        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search games..."
        />
        
        {/* Games Section */}
        <GamesSection
          games={filteredGames}
          onDeleteGame={handleDeleteGame}
          title="Saved Games"
        />
      </div>
    </div>
  );
};

export default GamingApp;
