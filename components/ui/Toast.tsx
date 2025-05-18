// components/Toast.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react-native';
import { useToastContext } from '../../context/ToastContext';
import { ToastType } from '@/types';
interface ToastProps {
  toast: ToastType;
}


export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToastContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const getIcon = () => {
    const iconProps = { size: 20 };
    switch (toast.variant) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case 'error':
        return <AlertCircle {...iconProps} className="text-red-500" />;
      case 'info':
      default:
        return <Info {...iconProps} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (toast.variant) {
      case 'success':
        return 'bg-green-50 border border-green-200';
      case 'error':
        return 'bg-red-50 border border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border border-blue-200';
    }
  };

  return (
    <View className={`flex-row items-center p-3 mb-3 rounded-lg shadow-sm ${getBgColor()}`}>
      <View className="mr-3">{getIcon()}</View>
      <Text className="flex-1 text-sm font-medium text-gray-900">{toast.message}</Text>
      <TouchableOpacity
        onPress={() => removeToast(toast.id)}
        className="p-1 rounded-lg"
      >
        <X size={20} className="text-gray-500" />
      </TouchableOpacity>
    </View>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <View className="absolute bottom-4 right-4 z-50 w-72">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </View>
  );
};
