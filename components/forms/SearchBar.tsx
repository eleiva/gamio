import React from 'react';
import { Search } from 'lucide-react';
import { SearchBarProps } from '@/types';

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search games...", 
  className = "" 
}) => {
  return (
    <div className={`search-container ${className}`}>
      <Search className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
        aria-label="Search games"
      />
    </div>
  );
};

export default SearchBar;
