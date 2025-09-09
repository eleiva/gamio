import React from 'react';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ 
  title = "Gamio", 
  className = "" 
}) => {
  return (
    <header className={`header ${className}`}>
      <h1 className="header__title">
        {title}
      </h1>
    </header>
  );
};

export default Header;
