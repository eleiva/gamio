import React from 'react';
import { Trash2 } from 'lucide-react';
import { GameCardProps } from '@/types';

const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  onDelete, 
  className = "" 
}) => {
  const handleDelete = () => {
    onDelete(game.id);
  };

  return (
    <div className={`game-card ${className}`}>
      <div className="game-card__image-container">
        <img
          src={game.image}
          alt={game.title}
          className="game-card__image"
          loading="lazy"
        />
        <button
          className="game-card__delete-button"
          onClick={handleDelete}
          aria-label={`Delete ${game.title}`}
          type="button"
        >
          <Trash2 className="game-card__delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
