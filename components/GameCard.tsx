"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { GameCardProps } from '@/types';

const GameCard: React.FC<GameCardProps> = ({ game, onDelete }) => {
  return (
    <div className="relative">
      {/* Game Image */}
      <div className="aspect-[3/4] relative">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        
        {/* Delete Button - Always visible */}
        <button
          className="absolute bottom-2 right-2 w-10 h-10 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800"
          onClick={() => onDelete(game.id)}
          type="button"
          aria-label={`Delete ${game.title}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
