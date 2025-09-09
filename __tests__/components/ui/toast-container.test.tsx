import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastContainer from '@/components/ui/toast-container';
import { Toast } from '@/components/ui/toast';

const mockToasts: Toast[] = [
  {
    id: 'toast-1',
    type: 'success',
    title: 'Success!',
    message: 'Operation completed',
    duration: 3000,
  },
  {
    id: 'toast-2',
    type: 'error',
    title: 'Error!',
    message: 'Something went wrong',
    duration: 3000,
  },
  {
    id: 'toast-3',
    type: 'info',
    title: 'Info',
    message: 'Here is some information',
    duration: 3000,
  },
];

describe('ToastContainer', () => {
  const mockOnRemoveToast = jest.fn();

  beforeEach(() => {
    mockOnRemoveToast.mockClear();
  });

  it('renders all toasts', () => {
    render(<ToastContainer toasts={mockToasts} onRemoveToast={mockOnRemoveToast} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('renders empty container when no toasts', () => {
    render(<ToastContainer toasts={[]} onRemoveToast={mockOnRemoveToast} />);
    
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    expect(screen.queryByText('Error!')).not.toBeInTheDocument();
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
  });

  it('calls onRemoveToast when toast is removed', () => {
    jest.useFakeTimers();
    
    render(<ToastContainer toasts={mockToasts} onRemoveToast={mockOnRemoveToast} />);
    
    // Fast-forward the entrance animation
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    fireEvent.click(closeButtons[0]);
    
    // Fast-forward the exit animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(mockOnRemoveToast).toHaveBeenCalledWith('toast-1');
    
    jest.useRealTimers();
  });

  it('renders correct number of toast components', () => {
    render(<ToastContainer toasts={mockToasts} onRemoveToast={mockOnRemoveToast} />);
    
    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    expect(closeButtons).toHaveLength(3);
  });

  it('handles single toast', () => {
    const singleToast = [mockToasts[0]];
    render(<ToastContainer toasts={singleToast} onRemoveToast={mockOnRemoveToast} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.queryByText('Error!')).not.toBeInTheDocument();
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
  });

  it('applies correct container class', () => {
    const { container } = render(
      <ToastContainer toasts={mockToasts} onRemoveToast={mockOnRemoveToast} />
    );
    
    expect(container.firstChild).toHaveClass('toast-container');
  });
});
