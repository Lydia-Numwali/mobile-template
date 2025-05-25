import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider, useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import this!


import store, { useAppDispatch } from "@/redux/store";
import { loadUserFromStorage } from "@/redux/userSlice";
import "../global.css";

SplashScreen.preventAutoHideAsync();


const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return <>{children}</>;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* Wrap your entire app content with GestureHandlerRootView */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppInitializer>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(root)" />
          </Stack>
          <Toast />
        </AppInitializer>
      </GestureHandlerRootView>
    </Provider>
  );
}