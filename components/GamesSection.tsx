import React from 'react';
import GameCard from './GameCard';
import FilterButtons from './ui/FilterButtons';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { GamesSectionProps } from '@/types';

const GamesSection: React.FC<GamesSectionProps> = ({ 
  games, 
  onDeleteGame, 
  onGameClick, 
  title = "Games", 
  className,
  showFilters = false,
  currentFilter,
  onFilterChange
}) => {
  return (
    <section className={cn("w-full", className)}>
      {/* Section Title */}
      <h2 className="text-3xl font-bold violet-title mb-8">
        {title}
      </h2>
      
      {/* Filter Buttons */}
      {showFilters && currentFilter && onFilterChange && (
        <FilterButtons
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        />
      )}
      
      {/* Games Grid or Empty State */}
      {games.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
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
        <Card className="flex justify-center items-center min-h-[300px] p-8">
          <CardContent className="text-center max-w-md">
            <div className="text-6xl mb-6 opacity-60">🎮</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nothing collected yet</h3>
            <p className="text-muted-foreground leading-relaxed">
              Start exploring games and collect your favorites to see them here!
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default GamesSection;
