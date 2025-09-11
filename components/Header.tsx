import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-12">
      {/* Brand Name with Logo */}
      <div className="flex items-center gap-4">
        <img 
          src="/favicon.ico" 
          alt="Gamio Logo" 
          className="w-12 h-12 md:w-16 md:h-16"
        />
        <h1 className="text-5xl md:text-6xl font-bold violet-title tracking-tight">
          Gamio
        </h1>
      </div>
    </header>
  );
};

export default Header;
