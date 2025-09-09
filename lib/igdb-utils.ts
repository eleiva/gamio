import { IGDBGame, Game } from '@/types';

/**
 * Convert IGDB game data to our internal Game format
 * This makes the data compatible with our existing components
 */
export function convertIGDBGameToGame(igdbGame: IGDBGame): Game {
  return {
    id: igdbGame.id,
    title: igdbGame.name,
    image: igdbGame.cover?.url 
      ? `https:${igdbGame.cover.url}` 
      : '/placeholder-game.jpg', // Fallback image
    description: igdbGame.summary,
    genre: igdbGame.genres?.[0]?.name, // Take first genre
    platform: igdbGame.platforms?.[0]?.name, // Take first platform
    releaseDate: igdbGame.first_release_date 
      ? new Date(igdbGame.first_release_date * 1000).toISOString().split('T')[0] // Convert timestamp to YYYY-MM-DD
      : undefined,
    rating: igdbGame.rating ? Math.round(igdbGame.rating / 10 * 5 * 10) / 10 : undefined, // Convert 0-100 to 0-5 scale
    isCompleted: false, // Default to not completed
    addedAt: new Date() // Set to current date when added
  };
}

/**
 * Convert array of IGDB games to our Game format
 */
export function convertIGDBGamesToGames(igdbGames: IGDBGame[]): Game[] {
  return igdbGames.map(convertIGDBGameToGame);
}

/**
 * Format IGDB image URL with proper size
 */
export function formatIGDBImageUrl(imageId: string, size: 'small' | 'medium' | 'big' = 'big'): string {
  const sizeMap = {
    small: 't_cover_small',
    medium: 't_cover_medium', 
    big: 't_cover_big'
  };
  
  return `https://images.igdb.com/igdb/image/upload/${sizeMap[size]}/${imageId}`;
}

/**
 * Format release date from IGDB timestamp
 */
export function formatReleaseDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Convert IGDB rating (0-100) to 5-star scale
 */
export function convertRating(igdbRating: number): number {
  return Math.round((igdbRating / 100) * 5 * 10) / 10;
}
