// Game related types
export interface Game {
  id: number;
  title: string;
  image: string;
  description?: string;
  genre?: string;
  platform?: string;
  releaseDate?: string;
  rating?: number;
  isCompleted?: boolean;
  addedAt?: Date;
}

// Component prop types
export interface GameCardProps {
  game: Game;
  onDelete: (gameId: number) => void;
  onClick?: (game: Game) => void;
  className?: string;
}

export interface GamesSectionProps {
  games: Game[];
  onDeleteGame: (gameId: number) => void;
  onGameClick?: (game: Game) => void;
  title?: string;
  className?: string;
  showFilters?: boolean;
  currentFilter?: SavedGamesFilter;
  onFilterChange?: (filter: SavedGamesFilter) => void;
  isLoading?: boolean;
  onStickyFilterChange?: (show: boolean) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export interface HeaderProps {
  title?: string;
  className?: string;
}

// IGDB API types
export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  genres?: Array<{ name: string }>;
  platforms?: Array<{ name: string }>;
  cover?: { url: string };
  rating?: number;
  first_release_date?: number;
}

export interface IGDBResponse {
  success: boolean;
  data: IGDBGame[];
  query?: string;
  count: number;
  limit?: number;
  offset?: number;
}

// API response types
export interface GameSearchResponse {
  games: Game[];
  total: number;
  page: number;
  limit: number;
}

export interface GameDetailsResponse {
  game: Game;
  screenshots?: string[];
  videos?: string[];
  reviews?: GameReview[];
}

export interface GameReview {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

// State types
export interface AppState {
  games: Game[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  selectedGame: Game | null;
}

// Action types for state management
export type AppAction =
  | { type: 'SET_GAMES'; payload: Game[] }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'DELETE_GAME'; payload: number }
  | { type: 'UPDATE_GAME'; payload: Game }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_GAME'; payload: Game | null };

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Filter types
export type SavedGamesFilter = 'lastAdded' | 'newest' | 'oldest';

// Event handler types
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
