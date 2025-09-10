import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  placeholder?: string;
  showClearButton?: boolean;
  showResults?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onFocus,
  onBlur,
  onClear,
  placeholder = "Search games...",
  showClearButton = false,
  showResults = false,
  className
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 custom-search-icon" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn("custom-search-bar pl-16 pr-12", showResults && "with-results")}
          aria-label="Search games"
        />
        {(value || showClearButton) && (
          <button
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClear}
            type="button"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
