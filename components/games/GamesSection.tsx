import React from 'react';
import GameCard from './GameCard';
import { GamesSectionProps } from '@/types';

const GamesSection: React.FC<GamesSectionProps> = ({ 
  games, 
  onDeleteGame, 
  title = "Games", 
  className = "" 
}) => {
  if (games.length === 0) {
    return (
      <section className={`games-section ${className}`}>
        <h2 className="games-section__title">
          {title}
        </h2>
        <div className="text-center py-8">
          <p className="text-muted">No games found. Add some games to get started!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`games-section ${className}`}>
      <h2 className="games-section__title">
        {title}
      </h2>
      
      <div className="games-grid">
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
