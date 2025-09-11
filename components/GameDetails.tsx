import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Tag, Heart } from 'lucide-react';
import ImageWithFallback from './ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
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
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
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
            
            <Button 
              variant={isCollected ? "destructive" : "default"}
              size="lg"
              onClick={handleCollectGame}
              type="button"
              className="flex items-center gap-2"
            >
              <Heart className={cn("h-4 w-4", isCollected && "fill-current")} />
              {isCollected ? 'Collected' : 'Collect game'}
            </Button>
            
            {/* Game Stats */}
            <div className="space-y-2">
              {game.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>Rating: {game.rating}</span>
                </div>
              )}
              {game.releaseDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Release: {new Date(game.releaseDate).toLocaleDateString('en-US', { 
                    month: 'numeric', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
              {game.genre && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Genre: {game.genre}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary */}
        {game.description && (
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{game.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Platforms */}
        {game.platform && (
          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{game.platform}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
