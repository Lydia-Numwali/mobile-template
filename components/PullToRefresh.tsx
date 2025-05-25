import React, { useEffect, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react-native';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ 
  onRefresh, 
  isRefreshing, 
  children 
}) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  const threshold = 80; // Minimum pull distance to trigger refresh

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable pull to refresh at the top of the page
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY || window.scrollY > 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    
    // Only allow pulling down, not up
    if (distance > 0) {
      // Apply resistance to make the pull feel natural
      const newDistance = Math.min(distance * 0.4, threshold * 1.5);
      setPullDistance(newDistance);
      
      // Prevent default scrolling behavior when pulling
      if (newDistance > 5) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling) return;
    
    if (pullDistance > threshold) {
      await onRefresh();
    }
    
    // Reset state
    setStartY(null);
    setPullDistance(0);
    setIsPulling(false);
  };

  useEffect(() => {
    if (isRefreshing) {
      setPullDistance(0);
    }
  }, [isRefreshing]);

  return (
    <div 
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      {isPulling && pullDistance > 0 && (
        <div 
          className="fixed top-0 left-0 w-full flex justify-center items-center z-50 transition-transform"
          style={{ 
            height: `${pullDistance}px`,
            transform: `translateY(${pullDistance > 0 ? '0' : '-100%'})`,
            opacity: Math.min(pullDistance / threshold, 1)
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <ArrowDownCircle 
              className={`text-primary mb-2 transition-transform ${pullDistance > threshold ? 'rotate-180' : ''}`} 
              size={24} 
            />
            <span className="text-sm font-medium">
              {pullDistance > threshold ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {isRefreshing && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center py-2 bg-gray-100 z-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      
      {children}
    </div>
  );
};