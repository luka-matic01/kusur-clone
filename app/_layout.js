import React, { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Fix import here
import Toast from "react-native-toast-message";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          console.log(userId);
          router.replace(`/tenants/${userId}`);
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

  return <Slot />;
};

const RootLayout = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    return () => {
      // Cleanup function if needed
    };
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <InitialLayout />
      <Toast />
    </ClerkProvider>
  );
};

export default RootLayout;
