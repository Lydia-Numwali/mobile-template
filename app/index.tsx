import { Redirect } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import storage from './(onboarding)/storage';
import { loginSuccess } from '@/redux/userSlice';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { token, user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const storedToken = await storage.getToken();
      const storedUser = await storage.getUser();

      if (storedToken && storedUser) {
        dispatch(loginSuccess({ token: storedToken, user: storedUser }));
      }

      setInitialized(true);
    };

    bootstrapAsync();
  }, []);

  if (!initialized || isLoading) return null;

  if (!user) return <Redirect href="/(onboarding)/onboarding-screens" />;

  return <Redirect href="/(root)/(tabs)/home" />;
}
