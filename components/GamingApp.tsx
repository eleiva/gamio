"use client";

import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import GamesSection from './GamesSection';
import GamesErrorBoundary from './GamesErrorBoundary';
import { Game } from '@/types';

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
