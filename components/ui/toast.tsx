"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

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

  useEffect(() => {
    // Auto remove after duration
    const timer = setTimeout(() => {
      handleRemove();
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300); // Match CSS transition duration
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="toast-icon toast-icon--success" />;
      case 'error':
        return <XCircle className="toast-icon toast-icon--error" />;
      default:
        return <CheckCircle className="toast-icon toast-icon--info" />;
    }
  };

  return (
    <div 
      className={`toast ${isVisible ? 'toast--visible' : ''} ${isLeaving ? 'toast--leaving' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        {getIcon()}
        <div className="toast-text">
          <div className="toast-title">{toast.title}</div>
          {toast.message && (
            <div className="toast-message">{toast.message}</div>
          )}
        </div>
        <button
          className="toast-close"
          onClick={handleRemove}
          type="button"
          aria-label="Close notification"
        >
          <X className="toast-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default ToastComponent;
