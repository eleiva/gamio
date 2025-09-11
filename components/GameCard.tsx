"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import ImageWithFallback from './ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
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
    <Card 
      className="group relative cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg" 
      onClick={handleCardClick}
    >
      {/* Delete Button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-2 right-2 h-10 w-10 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-200 shadow-sm z-10"
        onClick={handleDeleteClick}
        type="button"
        aria-label={`Delete ${game.title}`}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
      
      {/* Game Image */}
      <div className="aspect-[2/3] overflow-hidden rounded-lg">
        <ImageWithFallback
          src={game.image}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Card>
  );
};

export default GameCard;
