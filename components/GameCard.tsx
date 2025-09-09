"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import ImageWithFallback from './ui/ImageWithFallback';
import { GameCardProps } from '@/types';

const GameCard: React.FC<GameCardProps> = ({ game, onDelete, onClick }) => {
  const handleCardClick = (): void => {
    if (onClick) {
      onClick(game);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent triggering the card click
    onDelete(game.id);
  };

  return (
    <div className="game-card" onClick={handleCardClick}>
      {/* Delete Button - Above the image */}
      <button
        className="game-card__delete-button game-card__delete-button--top"
        onClick={handleDeleteClick}
        type="button"
        aria-label={`Delete ${game.title}`}
      >
        <Trash2 className="game-card__delete-icon" />
      </button>
      
      {/* Game Image */}
      <div className="game-card__image-container">
        <ImageWithFallback
          src={game.image}
          alt={game.title}
          className="game-card__image"
        />
      </div>
    </div>
  );
};

export default GameCard;
