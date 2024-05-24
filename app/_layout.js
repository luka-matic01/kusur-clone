import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { toastConfig } from "../utils/helpers";

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={
        "pk_test_bGl2ZS1ibG93ZmlzaC00Mi5jbGVyay5hY2NvdW50cy5kZXYk"
      }
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
      <Toast config={toastConfig} />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    const routing = async () => {
      if (isLoaded && !isSignedIn) {
        await AsyncStorage.setItem("animation", "no");
        router.push("/login");
      } else if (isSignedIn && isLoaded) {
        const userId = await AsyncStorage.getItem("userId");
        router.push(`/home/${userId}`);
        await SplashScreen.hideAsync();
      }
    };
    routing();
  }, [isLoaded]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" />
    </Stack>
  );
}
