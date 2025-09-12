"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300); // Match CSS transition duration
  }, [onRemove, toast.id]);

  useEffect(() => {
    // Auto remove after duration
    const timer = setTimeout(() => {
      handleRemove();
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.duration, handleRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-violet-600" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-border';
    }
  };

  return (
    <div 
      className={cn(
        "bg-background border rounded-lg shadow-lg p-4 min-w-96 max-w-lg pointer-events-auto transform transition-all duration-300",
        getBorderColor(),
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        isLeaving && "translate-y-[-100px] opacity-0"
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 relative">
        {getIcon()}
        <div className="flex-1 min-w-0 pr-8">
          <div className="text-sm font-medium text-foreground mb-1">{toast.title}</div>
          {toast.message && (
            <div className="text-xs text-muted-foreground">{toast.message}</div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-6 w-6"
          onClick={handleRemove}
          type="button"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ToastComponent;
