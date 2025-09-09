import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Tag, Heart } from 'lucide-react';
import { Game } from '@/types';

interface GameDetailsProps {
  game: Game;
  onClose: () => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game, onClose }) => {
  const [isCollected, setIsCollected] = useState<boolean>(false);

  // Check if game is already collected on component mount
  useEffect(() => {
    const collectedGames = localStorage.getItem('collectedGames');
    if (collectedGames) {
      const parsed = JSON.parse(collectedGames);
      setIsCollected(parsed.hasOwnProperty(game.id.toString()));
    }
  }, [game.id]);

  // Handle collect/uncollect game
  const handleCollectGame = (): void => {
    const collectedGames = localStorage.getItem('collectedGames');
    let gamesData: Record<string, Game> = {};
    
    if (collectedGames) {
      gamesData = JSON.parse(collectedGames);
    }

    if (isCollected) {
      // Remove from localStorage
      delete gamesData[game.id.toString()];
      setIsCollected(false);
    } else {
      // Add to localStorage with full game data
      gamesData[game.id.toString()] = game;
      setIsCollected(true);
    }

    localStorage.setItem('collectedGames', JSON.stringify(gamesData));
  };

  return (
    <div className="game-details-page">
      {/* Header */}
      <div className="game-details-header">
        <button
          className="game-details-back"
          onClick={onClose}
          type="button"
          aria-label="Go back"
        >
          <ArrowLeft className="game-details-back-icon" />
          <span>Back</span>
        </button>
      </div>

      {/* Game Content */}
      <div className="game-details-content">
        <div className="game-details-main">
          {/* Game Cover and Info */}
          <div className="game-details-info">
            <div className="game-details-cover">
              <img
                src={game.image}
                alt={game.title}
                className="game-details-cover-img"
              />
            </div>
            <div className="game-details-meta">
              <h1 className="game-details-title">{game.title}</h1>
              <p className="game-details-developer">{game.platform}</p>
              <button 
                className={`game-details-collect ${isCollected ? 'collected' : ''}`}
                onClick={handleCollectGame}
                type="button"
              >
                <Heart className={`game-details-collect-icon ${isCollected ? 'filled' : ''}`} />
                {isCollected ? 'Collected' : 'Collect game'}
              </button>
              
              {/* Game Stats */}
              <div className="game-details-stats">
                {game.rating && (
                  <div className="game-details-stat">
                    <Star className="game-details-stat-icon" />
                    <span>Rating: {game.rating}</span>
                  </div>
                )}
                {game.releaseDate && (
                  <div className="game-details-stat">
                    <Calendar className="game-details-stat-icon" />
                    <span>Release: {new Date(game.releaseDate).toLocaleDateString('en-US', { 
                      month: 'numeric', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                )}
                {game.genre && (
                  <div className="game-details-stat">
                    <Tag className="game-details-stat-icon" />
                    <span>Genre: {game.genre}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {game.description && (
            <div className="game-details-summary">
              <h2 className="game-details-section-title">Summary</h2>
              <p className="game-details-description">{game.description}</p>
            </div>
          )}

          {/* Platforms */}
          {game.platform && (
            <div className="game-details-platforms">
              <h2 className="game-details-section-title">Platforms</h2>
              <p className="game-details-platform-list">{game.platform}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
