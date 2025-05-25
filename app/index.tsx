import { Redirect } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import storage from './(onboarding)/storage';
import { loginSuccess } from '@/redux/userSlice';
import { useEffect, useState } from 'react';
import { PullToRefresh } from '@/components/PullToRefresh';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useToast } from '@/hooks/useToast';

export default function HomeScreen() {
  const { token, user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);
  const { showToast } = useToast();

  const refreshUser = async () => {
    try {
      const storedToken = await storage.getToken();
      const storedUser = await storage.getUser();

      if (storedToken && storedUser) {
        dispatch(loginSuccess({ token: storedToken, user: storedUser }));
        showToast('User refreshed successfully', 'success');
      } else {
        showToast('No user found in storage', 'error');
      }
    } catch (error) {
      showToast('Error refreshing user data', 'error');
    }
  };

  const { isRefreshing, handleRefresh } = usePullToRefresh({ onRefresh: refreshUser });

  useEffect(() => {
    const bootstrapAsync = async () => {
      await refreshUser();
      setInitialized(true);
    };

    bootstrapAsync();
  }, []);

  if (!initialized || isLoading) return null;

  if (!user) return <Redirect href="/(onboarding)/onboarding-screens" />;

  return (
    <PullToRefresh isRefreshing={isRefreshing} onRefresh={handleRefresh}>
      {/* Your actual screen content can go here */}
      <Redirect href="/(root)/(tabs)/home" />
    </PullToRefresh>
  );
}
