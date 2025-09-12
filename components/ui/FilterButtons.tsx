import React from 'react';
import { SavedGamesFilter } from '@/types';
import { cn } from '@/lib/utils';

interface FilterButtonsProps {
  currentFilter: SavedGamesFilter;
  onFilterChange: (filter: SavedGamesFilter) => void;
  className?: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
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
    <div className={cn("flex gap-2 mb-6 justify-start md:justify-center", className)}>
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
  );
};

export default FilterButtons;
