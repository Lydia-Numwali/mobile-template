import toast from 'react-hot-toast';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'loading' | 'default' = 'default') => {
    switch (type) {
      case 'success':
        return toast.success(message);
      case 'error':
        return toast.error(message);
      case 'loading':
        return toast.loading(message);
      default:
        return toast(message);
    }
  };

  return { showToast };
};