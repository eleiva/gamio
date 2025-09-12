import React from 'react';
import { Search, X } from 'lucide-react';
import ImageWithFallback from './ui/ImageWithFallback';
import { cn } from '@/lib/utils';
import { Game } from '@/types';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  onGameSelect: (game: Game) => void;
  placeholder?: string;
  showClearButton?: boolean;
  className?: string;
  // Dropdown props
  searchResults: Game[];
  popularGames: Game[];
  isSearchFocused: boolean;
  isLoading: boolean;
  error: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onFocus,
  onBlur,
  onClear,
  onGameSelect,
  placeholder = "Search games...",
  showClearButton = false,
  className,
  searchResults,
  popularGames,
  isSearchFocused,
  isLoading,
  error
}) => {
  const renderGameItem = (game: Game) => (
    <button
      key={game.id}
      className="w-full flex items-center gap-1.5 md:gap-3 p-1.5 md:p-3 hover:bg-muted rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent input blur
        onGameSelect(game);
      }}
      onClick={() => onGameSelect(game)}
      type="button"
      role="option"
      aria-label={`View details for ${game.title}${game.genre ? `, ${game.genre} game` : ''}`}
    >
      <div className="w-6 h-6 md:w-12 md:h-12 rounded-md overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={game.image}
          alt={`${game.title} game cover`}
          className="w-full h-full object-cover"
          size={48}
        />
      </div>
      <div className="flex flex-col gap-0.5 md:gap-1 flex-1 min-w-0">
        <span className="text-xs md:text-sm font-medium text-foreground truncate">{game.title}</span>
        <span className="hidden md:block text-xs text-muted-foreground truncate">{game.genre}</span>
      </div>
    </button>
  );

  const renderDropdown = () => {
    if (!isSearchFocused) {
      return null;
    }

      // Search Results
    if (value && searchResults.length > 0) {
      return (
        <div 
          className="absolute top-0 left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg z-50"
          role="listbox"
          aria-label="Search results"
        >
          <div className="p-1 md:p-2">
            {searchResults.slice(0, 7).map(renderGameItem)}
          </div>
        </div>
      );
    }

    // Popular Games
    if (!value && popularGames.length > 0) {
      return (
        <div 
          className="absolute top-0 left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg z-50"
          role="listbox"
          aria-label="Popular games"
        >
          <div className="p-1 md:p-2">
            {popularGames.slice(0, 7).map(renderGameItem)}
          </div>
        </div>
      );
    }

    // Loading States
    if (value && isLoading) {
      return (
        <div className="absolute top-full left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg p-4 text-center z-50 md:left-auto md:right-auto md:w-full md:max-w-md md:mx-auto">
          <p className="text-muted-foreground">Searching games...</p>
        </div>
      );
    }

    if (!value && popularGames.length === 0 && isLoading) {
      return (
        <div className="absolute top-full left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg p-4 text-center z-50 md:left-auto md:right-auto md:w-full md:max-w-md md:mx-auto">
          <p className="text-muted-foreground">Loading popular games...</p>
        </div>
      );
    }

    // No Results
    if (value && searchResults.length === 0 && !isLoading) {
      return (
        <div className="absolute top-full left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg p-4 text-center z-50 md:left-auto md:right-auto md:w-full md:max-w-md md:mx-auto">
          <p className="text-muted-foreground">No games found for &quot;{value}&quot;</p>
        </div>
      );
    }

    // Error States
    if (!value && popularGames.length === 0 && error) {
      return (
        <div className="absolute top-full left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg p-4 text-center z-50 md:left-auto md:right-auto md:w-full md:max-w-md md:mx-auto">
          <p className="text-destructive">Failed to load popular games</p>
        </div>
      );
    }

    if (value && error) {
      return (
        <div className="absolute top-full left-0 right-0 bg-background search-results-dropdown rounded-b-lg shadow-lg p-4 text-center z-50 md:left-auto md:right-auto md:w-full md:max-w-md md:mx-auto">
          <p className="text-destructive">Search failed. Please try again.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex justify-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 custom-search-icon" aria-hidden="true" />
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className="custom-search-bar pl-16 pr-12 md:pl-12 md:pr-10 w-full"
            aria-label="Search games"
            aria-expanded={isSearchFocused}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            role="combobox"
            autoComplete="off"
          />
          {(value || showClearButton) && (
            <button
              className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded md:right-2 md:h-5 md:w-5"
              onClick={onClear}
              type="button"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      
      {/* Dropdown */}
      <div className="flex justify-center">
        <div className="relative w-full md:max-w-md">
          {renderDropdown()}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
