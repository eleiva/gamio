import React from 'react';
import GameCard from './GameCard';
import { GamesSectionProps } from '@/types';

const GamesSection: React.FC<GamesSectionProps> = ({ games, onDeleteGame, title = "Games" }) => {
  return (
    <section className="w-full">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-black mb-8">
        {title}
      </h2>
      
      {/* Games Grid */}
      <div className="grid grid-cols-1 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onDelete={onDeleteGame}
          />
        ))}
      </div>
    </section>
  );
};

export default GamesSection;
