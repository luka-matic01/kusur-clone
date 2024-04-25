import React, { useCallback, useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, Tabs, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Fix import here
import Toast from "react-native-toast-message";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import { toastConfig } from "../utils/helpers";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) return;

      const inTabsGroup = segments[0] === "(auth)";

      if (isSignedIn && !inTabsGroup) {
        try {
          const userId = await AsyncStorage.getItem("userId");
          router.replace(`/home/${userId}`);
        } catch (error) {
          console.error("Error fetching userId from AsyncStorage:", error);
          // Handle error if needed
        }
      } else if (!isSignedIn) {
        router.replace("/login");
      }
    };

    fetchData();

    // Don't return anything from useEffect
  }, [isLoaded, isSignedIn]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

  if (!appIsReady) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={"pk_test_a2Vlbi10ZXJtaXRlLTk3LmNsZXJrLmFjY291bnRzLmRldiQ"}
      tokenCache={tokenCache}
    >
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <InitialLayout />
        <Toast config={toastConfig} />
      </View>
    </ClerkProvider>
  );
};

export default RootLayout;
