import React from 'react';
import { Game } from '@/types';

interface SimilarGamesProps {
  games: Game[];
  onGameClick?: (game: Game) => void;
  className?: string;
}

const SimilarGames: React.FC<SimilarGamesProps> = ({ games, onGameClick, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h2 className="text-xl font-bold text-purple-600">Similar games</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {games.map((game) => (
          <div 
            key={game.id}
            className="flex-shrink-0 w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onGameClick?.(game)}
          >
            <img 
              src={game.image || `https://placehold.co/96x128/6b7280/ffffff?text=${encodeURIComponent(game.title)}`}
              alt={game.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;
