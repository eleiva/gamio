import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastComponent from '@/components/ui/toast';
import { Toast } from '@/components/ui/toast';

const mockToast: Toast = {
  id: 'test-toast-1',
  type: 'success',
  title: 'Success!',
  message: 'Operation completed successfully',
  duration: 3000,
};

describe('ToastComponent', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  it('renders success toast correctly', () => {
    render(<ToastComponent toast={mockToast} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('renders error toast correctly', () => {
    const errorToast: Toast = {
      ...mockToast,
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong',
    };
    
    render(<ToastComponent toast={errorToast} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders info toast correctly', () => {
    const infoToast: Toast = {
      ...mockToast,
      type: 'info',
      title: 'Info',
      message: 'Here is some information',
    };
    
    render(<ToastComponent toast={infoToast} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Here is some information')).toBeInTheDocument();
  });

  it('calls onRemove when close button is clicked', async () => {
    jest.useFakeTimers();
    
    render(<ToastComponent toast={mockToast} onRemove={mockOnRemove} />);
    
    // Fast-forward the entrance animation
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Fast-forward the exit animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(mockOnRemove).toHaveBeenCalledWith('test-toast-1');
    
    jest.useRealTimers();
  });

  it('applies correct CSS classes based on type', () => {
    jest.useFakeTimers();
    
    const { rerender } = render(<ToastComponent toast={mockToast} onRemove={mockOnRemove} />);
    
    // Fast-forward the entrance animation
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    // Success toast
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toHaveClass('translate-y-0', 'opacity-100');
    
    // Error toast
    const errorToast: Toast = { ...mockToast, type: 'error' };
    rerender(<ToastComponent toast={errorToast} onRemove={mockOnRemove} />);
    act(() => {
      jest.advanceTimersByTime(10);
    });
    const errorToastElement = screen.getByRole('alert');
    expect(errorToastElement).toHaveClass('translate-y-0', 'opacity-100');
    
    // Info toast
    const infoToast: Toast = { ...mockToast, type: 'info' };
    rerender(<ToastComponent toast={infoToast} onRemove={mockOnRemove} />);
    act(() => {
      jest.advanceTimersByTime(10);
    });
    const infoToastElement = screen.getByRole('alert');
    expect(infoToastElement).toHaveClass('translate-y-0', 'opacity-100');
    
    jest.useRealTimers();
  });

  it('handles toast without message', () => {
    const toastWithoutMessage: Toast = {
      ...mockToast,
      message: '',
    };
    
    render(<ToastComponent toast={toastWithoutMessage} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.queryByText('Operation completed successfully')).not.toBeInTheDocument();
  });

  it('handles toast without title', () => {
    const toastWithoutTitle: Toast = {
      ...mockToast,
      title: '',
    };
    
    render(<ToastComponent toast={toastWithoutTitle} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });
});
