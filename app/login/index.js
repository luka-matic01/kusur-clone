// LoginScreen.js
import React, { useState } from "react";
import { Text, TextInput, Button, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const LoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp } = useSignUp();

  const sendVerificationCode = async () => {
    try {
      await signUp.create({
        phoneNumber: phoneNumber,
      });
      await signUp.preparePhoneNumberVerification();
      // Navigate to the VerificationScreen and pass the verificationId as a prop
      router.push("/verify");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="mt-14">
      <Text>Enter your phone number:</Text>
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Verification Code" onPress={sendVerificationCode} />
    </SafeAreaView>
  );
};

export default LoginScreen;
