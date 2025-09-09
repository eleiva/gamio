import { useCallback } from 'react';

export interface ErrorHandlerOptions {
  onError?: (error: Error, context?: string) => void;
  logToConsole?: boolean;
  logToService?: boolean;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    onError,
    logToConsole = process.env.NODE_ENV === 'development',
    logToService = false,
  } = options;

  const handleError = useCallback(
    (error: Error, context?: string) => {
      // Log to console in development
      if (logToConsole) {
        console.error(`Error${context ? ` in ${context}` : ''}:`, error);
      }

      // Log to external service (implement as needed)
      if (logToService) {
        // Example: send error to logging service
        // logErrorToService(error, { context, timestamp: new Date().toISOString() });
      }

      // Call custom error handler
      if (onError) {
        onError(error, context);
      }
    },
    [onError, logToConsole, logToService]
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      context?: string
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error as Error, context);
        return null;
      }
    },
    [handleError]
  );

  const withErrorHandling = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => R,
      context?: string
    ) => {
      return (...args: T): R | null => {
        try {
          return fn(...args);
        } catch (error) {
          handleError(error as Error, context);
          return null;
        }
      };
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
    withErrorHandling,
  };
};
