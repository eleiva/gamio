import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/useToast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('should add success toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Success!', 'Operation completed successfully');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      id: expect.any(String),
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
      duration: 3000
    });
  });

  it('should add error toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showError('Error!', 'Something went wrong');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      id: expect.any(String),
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong',
      duration: 3000
    });
  });

  it('should add info toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showInfo('Info', 'Here is some information');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      id: expect.any(String),
      type: 'info',
      title: 'Info',
      message: 'Here is some information',
      duration: 3000
    });
  });

  it('should remove toast by id', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Test', 'Message');
    });

    const toastId = result.current.toasts[0].id;
    
    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should not auto-dismiss toasts (handled by ToastComponent)', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Test', 'Message');
    });

    expect(result.current.toasts).toHaveLength(1);

    // Fast-forward time by 3000ms (default timeout)
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // useToast hook doesn't handle auto-dismiss, ToastComponent does
    expect(result.current.toasts).toHaveLength(1);
  });

  it('should handle multiple toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Success 1', 'Message 1');
      result.current.showError('Error 1', 'Message 2');
      result.current.showInfo('Info 1', 'Message 3');
    });

    expect(result.current.toasts).toHaveLength(3);
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[1].type).toBe('error');
    expect(result.current.toasts[2].type).toBe('info');
  });

  it('should generate unique ids for toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Test 1', 'Message 1');
      result.current.showSuccess('Test 2', 'Message 2');
    });

    const ids = result.current.toasts.map(toast => toast.id);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it('should handle removing non-existent toast gracefully', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.removeToast('non-existent-id');
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
