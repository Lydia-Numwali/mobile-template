import { useState, useCallback } from 'react';

interface UsePullToRefreshProps {
  onRefresh: () => Promise<void>;
}

export const usePullToRefresh = ({ onRefresh }: UsePullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  return {
    isRefreshing,
    handleRefresh
  };
};