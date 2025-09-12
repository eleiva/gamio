import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Tag } from 'lucide-react';
import ImageWithFallback from './ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import CollectButton from './ui/CollectButton';
import Chip from './ui/Chip';
import MediaCarousel from './ui/MediaCarousel';
import SimilarGames from './ui/SimilarGames';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import { Game } from '@/types';

interface GameDetailsProps {
  game: Game;
  onClose: () => void;
  onGameCollected?: (game: Game, isCollected: boolean) => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game, onClose, onGameCollected }) => {
  const [isCollected, setIsCollected] = useState<boolean>(false);

  // Sample media images for demonstration
  const mediaImages = [
    'https://placehold.co/128x128/4f46e5/ffffff?text=Image+1',
    'https://placehold.co/128x128/059669/ffffff?text=Image+2',
    'https://placehold.co/128x128/dc2626/ffffff?text=Image+3',
    'https://placehold.co/128x128/7c3aed/ffffff?text=Image+4',
  ];

  // Sample similar games for demonstration
  const similarGames: Game[] = [
    {
      id: 1,
      title: 'Grand Theft Auto III',
      image: 'https://placehold.co/96x128/6b7280/ffffff?text=GTA+III',
      description: 'The game that revolutionized open-world gaming',
      genre: 'Action-Adventure',
      platform: 'PlayStation 2, PC',
      releaseDate: '2001-10-22',
      rating: 9.5
    },
    {
      id: 2,
      title: 'Grand Theft Auto San Andreas',
      image: 'https://placehold.co/96x128/6b7280/ffffff?text=GTA+SA',
      description: 'Explore the state of San Andreas',
      genre: 'Action-Adventure',
      platform: 'PlayStation 2, PC',
      releaseDate: '2004-10-26',
      rating: 9.7
    },
    {
      id: 3,
      title: 'Grand Theft Auto IV',
      image: 'https://placehold.co/96x128/6b7280/ffffff?text=GTA+IV',
      description: 'Welcome to Liberty City',
      genre: 'Action-Adventure',
      platform: 'PlayStation 3, Xbox 360, PC',
      releaseDate: '2008-04-29',
      rating: 9.3
    }
  ];

  // Check if game is already collected on component mount
  useEffect(() => {
    const collectedGames = localStorage.getItem('collectedGames');
    if (collectedGames) {
      const parsed = JSON.parse(collectedGames);
      setIsCollected(parsed.hasOwnProperty(game.id.toString()));
    }
  }, [game.id]);

  // Handle collect/uncollect game
  const handleCollectGame = (): void => {
    const collectedGames = localStorage.getItem('collectedGames');
    let gamesData: Record<string, Game> = {};
    
    if (collectedGames) {
      gamesData = JSON.parse(collectedGames);
    }

    if (isCollected) {
      // Remove from localStorage
      delete gamesData[game.id.toString()];
      setIsCollected(false);
    } else {
      // Add to localStorage with full game data and current timestamp
      const gameWithTimestamp = {
        ...game,
        addedAt: new Date()
      };
      gamesData[game.id.toString()] = gameWithTimestamp;
      setIsCollected(true);
    }

    localStorage.setItem('collectedGames', JSON.stringify(gamesData));
    
    // Notify parent component about the collection change
    if (onGameCollected) {
      onGameCollected(game, !isCollected);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <Button
          variant="ghost"
          onClick={onClose}
          type="button"
          aria-label="Go back"
          className="flex items-center gap-3 text-lg"
        >
          <ArrowLeft className="h-6 w-6" />
          <span>Back</span>
        </Button>
      </div>

      {/* Game Content */}
      <div className="space-y-8">
        {/* Game Cover and Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={game.image}
              alt={game.title}
              className="w-48 h-64 md:w-56 md:h-80 object-cover rounded-lg shadow-lg"
              size={200}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{game.title}</h1>
              <p className="text-lg text-muted-foreground">{game.platform}</p>
            </div>
            
            <CollectButton 
              isCollected={isCollected}
              onClick={handleCollectGame}
            />
            
            {/* Game Stats */}
            <div className="flex flex-wrap gap-3">
              {game.rating && (
                <Chip
                  icon={<Star className="h-4 w-4" />}
                  label="Rating"
                  value={game.rating.toString()}
                />
              )}
              {game.releaseDate && (
                <Chip
                  icon={<Calendar className="h-4 w-4" />}
                  label="Release"
                  value={new Date(game.releaseDate).toLocaleDateString('en-US', { 
                    month: 'numeric', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                />
              )}
              {game.genre && (
                <Chip
                  icon={<Tag className="h-4 w-4" />}
                  label="Genre"
                  value={game.genre}
                />
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary */}
        {game.description && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Summary</h2>
            <p className="text-foreground leading-relaxed">{game.description}</p>
          </div>
        )}

        {/* Platforms */}
        {game.platform && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{game.platform}</Badge>
            </div>
          </div>
        )}

        {/* Media */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Media</h2>
          <MediaCarousel images={mediaImages} />
        </div>

        {/* Similar Games */}
        <SimilarGames games={similarGames} />
      </div>
    </div>
  );
};

export default GameDetails;
