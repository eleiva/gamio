import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimilarGames from '@/components/ui/SimilarGames';
import { Game } from '@/types';

describe('SimilarGames', () => {
  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Grand Theft Auto III',
      image: 'https://example.com/gta3.jpg',
      description: 'Action game',
      genre: 'Action',
      platform: 'PC',
      releaseDate: '2001-10-22',
      rating: 4.5,
      isCompleted: false,
      addedAt: new Date('2001-10-22')
    },
    {
      id: 2,
      title: 'Grand Theft Auto San Andreas',
      image: 'https://example.com/gta-sa.jpg',
      description: 'Open world action',
      genre: 'Action',
      platform: 'PC',
      releaseDate: '2004-10-26',
      rating: 4.8,
      isCompleted: false,
      addedAt: new Date('2004-10-26')
    },
    {
      id: 3,
      title: 'Grand Theft Auto IV',
      image: 'https://example.com/gta4.jpg',
      description: 'Modern action game',
      genre: 'Action',
      platform: 'PC',
      releaseDate: '2008-04-29',
      rating: 4.6,
      isCompleted: false,
      addedAt: new Date('2008-04-29')
    }
  ];

  const mockOnGameClick = jest.fn();

  beforeEach(() => {
    mockOnGameClick.mockClear();
  });

  it('renders the section title', () => {
    render(<SimilarGames games={mockGames} />);
    
    expect(screen.getByText('Similar games')).toBeInTheDocument();
  });

  it('renders all similar games', () => {
    render(<SimilarGames games={mockGames} />);
    
    mockGames.forEach(game => {
      const image = screen.getByAltText(game.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', game.image);
    });
  });

  it('applies correct styling to the title', () => {
    render(<SimilarGames games={mockGames} />);
    
    const title = screen.getByText('Similar games');
    expect(title).toHaveClass('text-xl', 'font-bold', 'text-purple-600');
  });

  it('applies correct styling to game containers', () => {
    const { container } = render(<SimilarGames games={mockGames} />);
    
    const gameContainers = container.querySelectorAll('.flex-shrink-0.w-24.h-32');
    expect(gameContainers).toHaveLength(mockGames.length);
    
    gameContainers.forEach(container => {
      expect(container).toHaveClass(
        'flex-shrink-0', 'w-24', 'h-32', 'bg-gray-200', 
        'rounded-lg', 'flex', 'items-center', 'justify-center',
        'cursor-pointer', 'hover:opacity-80', 'transition-opacity'
      );
    });
  });

  it('applies correct styling to images', () => {
    render(<SimilarGames games={mockGames} />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveClass('w-full', 'h-full', 'object-cover', 'rounded-lg');
    });
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-similar-games-class';
    const { container } = render(<SimilarGames games={mockGames} className={customClass} />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('space-y-3', customClass);
  });

  it('calls onGameClick when a game is clicked', () => {
    render(<SimilarGames games={mockGames} onGameClick={mockOnGameClick} />);
    
    const firstGameContainer = screen.getByAltText(mockGames[0].title).closest('div');
    fireEvent.click(firstGameContainer!);
    
    expect(mockOnGameClick).toHaveBeenCalledTimes(1);
    expect(mockOnGameClick).toHaveBeenCalledWith(mockGames[0]);
  });

  it('does not crash when onGameClick is not provided', () => {
    render(<SimilarGames games={mockGames} />);
    
    const firstGameContainer = screen.getByAltText(mockGames[0].title).closest('div');
    
    expect(() => {
      fireEvent.click(firstGameContainer!);
    }).not.toThrow();
  });

  it('handles empty games array', () => {
    render(<SimilarGames games={[]} />);
    
    expect(screen.getByText('Similar games')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('uses placeholder image when game image is not provided', () => {
    const gamesWithoutImages: Game[] = [
      {
        ...mockGames[0],
        image: ''
      }
    ];
    
    render(<SimilarGames games={gamesWithoutImages} />);
    
    const image = screen.getByAltText(mockGames[0].title);
    const expectedPlaceholder = `https://placehold.co/96x128/6b7280/ffffff?text=${encodeURIComponent(mockGames[0].title)}`;
    expect(image).toHaveAttribute('src', expectedPlaceholder);
  });

  it('handles multiple clicks on different games', () => {
    render(<SimilarGames games={mockGames} onGameClick={mockOnGameClick} />);
    
    // Click on first game
    const firstGameContainer = screen.getByAltText(mockGames[0].title).closest('div');
    fireEvent.click(firstGameContainer!);
    
    // Click on second game
    const secondGameContainer = screen.getByAltText(mockGames[1].title).closest('div');
    fireEvent.click(secondGameContainer!);
    
    expect(mockOnGameClick).toHaveBeenCalledTimes(2);
    expect(mockOnGameClick).toHaveBeenNthCalledWith(1, mockGames[0]);
    expect(mockOnGameClick).toHaveBeenNthCalledWith(2, mockGames[1]);
  });

  it('renders games in horizontal scrollable container', () => {
    const { container } = render(<SimilarGames games={mockGames} />);
    
    const scrollableContainer = container.querySelector('.flex.gap-4.overflow-x-auto.pb-2.scrollbar-hide');
    expect(scrollableContainer).toBeInTheDocument();
  });
});
