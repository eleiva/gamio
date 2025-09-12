import { renderHook, act } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';
import { useIGDB } from '@/hooks/useIGDB';
import { useDebounce } from '@/hooks/useDebounce';

// Mock the dependencies
jest.mock('@/hooks/useIGDB');
jest.mock('@/hooks/useDebounce');

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

const mockUseIGDB = useIGDB as jest.MockedFunction<typeof useIGDB>;
const mockUseDebounce = useDebounce as jest.MockedFunction<typeof useDebounce>;

describe('useSearch', () => {
  const mockOnGameSelect = jest.fn();
  const mockSearchGames = jest.fn();
  const mockGetPopularGames = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseIGDB.mockReturnValue({
      searchGames: mockSearchGames,
      getPopularGames: mockGetPopularGames,
      isLoading: false,
      error: null,
    });
    
    mockUseDebounce.mockReturnValue('test search');
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    expect(result.current.searchTerm).toBe('');
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.popularGames).toEqual([]);
    expect(result.current.isSearchFocused).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle search input change', () => {
    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    act(() => {
      result.current.handleSearchChange({
        target: { value: 'test game' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchTerm).toBe('test game');
  });

  it('should handle search focus', async () => {
    const mockPopularGames = [
      { id: 1, title: 'Popular Game 1', genre: 'Action' },
      { id: 2, title: 'Popular Game 2', genre: 'RPG' }
    ];

    mockGetPopularGames.mockResolvedValue(mockPopularGames);

    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    await act(async () => {
      await result.current.handleSearchFocus();
    });

    expect(result.current.isSearchFocused).toBe(true);
    expect(mockGetPopularGames).toHaveBeenCalledWith(6);
    
    // Wait for state updates to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  });

  it('should handle search blur', () => {
    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    act(() => {
      result.current.handleSearchFocus();
    });

    expect(result.current.isSearchFocused).toBe(true);

    act(() => {
      result.current.handleSearchBlur();
    });

    // Should be false after blur
    expect(result.current.isSearchFocused).toBe(false);
  });

  it('should handle clear search', () => {
    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    // Set some state first
    act(() => {
      result.current.handleSearchChange({
        target: { value: 'test' }
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleSearchFocus();
    });

    expect(result.current.searchTerm).toBe('test');
    expect(result.current.isSearchFocused).toBe(true);

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.isSearchFocused).toBe(false);
  });

  it('should handle game selection', async () => {
    const mockGame = { id: 1, title: 'Test Game', genre: 'Action' };
    const { result } = renderHook(() => useSearch({ onGameSelect: mockOnGameSelect }));

    act(() => {
      result.current.handleSearchFocus();
    });

    expect(result.current.isSearchFocused).toBe(true);

    act(() => {
      result.current.handleGameSelect(mockGame);
    });

    expect(mockOnGameSelect).toHaveBeenCalledWith(mockGame);
    expect(result.current.isSearchFocused).toBe(false);
    
    // Wait for the setTimeout to complete and check scroll behavior
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
