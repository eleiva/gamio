import React, { useEffect, useRef } from 'react';
import GameCard from './GameCard';
import FilterButtons from './ui/FilterButtons';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { GamesSectionProps } from '@/types';
import { Loader2 } from 'lucide-react';

const GamesSection: React.FC<GamesSectionProps> = ({ 
  games, 
  onDeleteGame, 
  onGameClick, 
  title = "Games", 
  className,
  showFilters = false,
  currentFilter,
  onFilterChange,
  isLoading = false,
  onStickyFilterChange
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Show sticky filter when there are enough games (more than 2 games for testing) and on mobile
  const shouldShowStickyFilter = showFilters && games.length > 2 && currentFilter && onFilterChange && onStickyFilterChange;
  

  useEffect(() => {
    if (!shouldShowStickyFilter) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !filterRef.current) {
            ticking = false;
            return;
          }

          const filterRect = filterRef.current.getBoundingClientRect();
          
          // Add a small threshold to prevent flickering at the boundary
          const threshold = 10;
          
          // Show sticky filter when the original filter is scrolled out of view
          // Hide it when scrolling back up and the original filter is visible again
          const shouldShow = filterRect.bottom < -threshold;
          const shouldHide = filterRect.top > threshold && filterRect.bottom > 0;
          
          if (shouldShow) {
            onStickyFilterChange(true);
          } else if (shouldHide) {
            onStickyFilterChange(false);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShowStickyFilter, onStickyFilterChange]);

  return (
    <section ref={sectionRef} className={cn("w-full", className)}>
      {/* Section Title */}
      <h2 className="text-3xl font-bold violet-title mb-8 text-left md:text-center">
        {title}
      </h2>
      
      {/* Filter Buttons */}
      {showFilters && currentFilter && onFilterChange && (
        <div ref={filterRef}>
          <FilterButtons
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      )}
      
      {/* Games Grid, Loading State, or Empty State */}
      {isLoading ? (
        <Card className="flex justify-center items-center min-h-[300px] p-8">
          <CardContent className="text-center max-w-md">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Loading saved games...</h3>
            <p className="text-muted-foreground leading-relaxed">
              Please wait while we load your collection
            </p>
          </CardContent>
        </Card>
      ) : games.length > 0 ? (
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
