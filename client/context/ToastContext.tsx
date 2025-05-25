import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastType } from '@/types'; // We're using ToastType throughout

interface ToastContextType {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((toast: Omit<ToastType, 'id' | 'timestamp'>) => {
    const newToast: ToastType = {
      ...toast,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, newToast.duration ?? 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
