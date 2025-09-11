import { useState, useCallback } from 'react';
import { Toast } from '@/components/ui/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    addToast({
      type: 'success',
      title,
      message,
    });
  }, [addToast]);

  const showError = useCallback((title: string, message?: string) => {
    addToast({
      type: 'error',
      title,
      message,
    });
  }, [addToast]);

  const showInfo = useCallback((title: string, message?: string) => {
    addToast({
      type: 'info',
      title,
      message,
    });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
  };
};
