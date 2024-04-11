import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import axios from "axios";

const VerifyScreen = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const { signUp, setActive } = useSignUp();

  const submitVerificationCode = async () => {
    try {
      const verifiedCode = await signUp.attemptPhoneNumberVerification({
        code: verificationCode,
      });

      if (verifiedCode) {
        // await setActive({ session: verifiedCode.createdSessionId });

        const response = await axios.post(
          "http://192.168.100.168:3000/api/auth/login",
          {
            phoneNumber: verifiedCode.phoneNumber,
          }
        );

        // Handle response
        if (response.status === 200) {
          const userId = response.data.user.id;
          router.push(`/tenants/${userId}`);
        }

        // Navigate to the homepage
        // router.push("/"); // Replace '/home' with the actual route path
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <View>
      <Text>Enter verification code:</Text>
      <TextInput
        placeholder="Verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Submit Code" onPress={submitVerificationCode} />
    </View>
  );
};

export default VerifyScreen;
