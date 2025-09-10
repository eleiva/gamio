import React from 'react';
import { Button } from '@/components/ui/button';
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
    <div className={cn("flex gap-2 mb-6", className)}>
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "transition-all duration-200",
            currentFilter === filter.key 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "text-primary hover:bg-primary/10 hover:text-primary"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
