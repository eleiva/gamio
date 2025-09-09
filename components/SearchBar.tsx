import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  placeholder?: string;
  showClearButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onFocus,
  onBlur,
  onClear,
  placeholder = "Search games...",
  showClearButton = false
}) => {
  return (
    <>
      <Search className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search games"
      />
      {(value || showClearButton) && (
        <button
          className="search-clear"
          onClick={onClear}
          type="button"
          aria-label="Clear search"
        >
          <X className="search-clear-icon" />
        </button>
      )}
    </>
  );
};

export default SearchBar;
