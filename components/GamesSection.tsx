import React from 'react';
import GameCard from './GameCard';
import { GamesSectionProps } from '@/types';

const GamesSection: React.FC<GamesSectionProps> = ({ games, onDeleteGame, onGameClick, title = "Games", className }) => {
  return (
    <section className={`w-full ${className || ''}`}>
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-black mb-8">
        {title}
      </h2>
      
      {/* Games Grid or Empty State */}
      {games.length > 0 ? (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onDelete={onDeleteGame}
              onClick={onGameClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">🎮</div>
            <h3 className="empty-state-title">Nothing collected yet</h3>
            <p className="empty-state-description">
              Start exploring games and collect your favorites to see them here!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GamesSection;
