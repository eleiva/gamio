import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    expect(screen.getByPlaceholderText('Search games...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Custom placeholder" />);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    render(<SearchBar value="test search" onChange={mockOnChange} />);
    
    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'new search' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('aria-label', 'Search games');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
  });
});
