import React from 'react';
import { SavedGamesFilter } from '@/types';
import { cn } from '@/lib/utils';

interface StickyFilterBarProps {
  currentFilter: SavedGamesFilter;
  onFilterChange: (filter: SavedGamesFilter) => void;
  className?: string;
}

const StickyFilterBar: React.FC<StickyFilterBarProps> = ({ 
  currentFilter, 
  onFilterChange, 
  className 
}) => {
  const filters: Array<{ key: SavedGamesFilter; label: string }> = [
    { key: 'lastAdded', label: 'Last added' },
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' }
  ];

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 px-4 md:hidden",
      "bg-white/80 backdrop-blur-md border-b border-gray-200/50",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                currentFilter === filter.key 
                  ? "violet-button-active shadow-md" 
                  : "violet-button-inactive"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyFilterBar;
