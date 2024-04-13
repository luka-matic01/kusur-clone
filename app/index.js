import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const { signOut } = useAuth();

  // useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     try {
  //       await AsyncStorage.removeItem("userId");
  //       // Sign out the user
  //       await signOut();
  //     } catch (error) {
  //       console.error("Error clearing AsyncStorage:", error);
  //       // Handle error if needed
  //     }
  //   };

  //   clearAsyncStorage();
  // }, []);

  return <Redirect href="/login" />;
};

export default Index;
