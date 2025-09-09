"use client";

import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search games..." }) => {
  return (
    <div className="relative w-full mb-10">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-3 w-full border border-gray-200 focus:border-gray-300 focus:outline-none bg-white rounded-none h-12 text-base"
      />
    </div>
  );
};

export default SearchBar;
