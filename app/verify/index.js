import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomInput = ({ label, value, onChangeText }) => (
  <View style={styles.container} className="w-[300px]">
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType="number-pad"
      />
    </View>
  </View>
);

const VerifyScreen = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [wrongCodeMessage, setWrongCodeMessage] = useState("");
  const { signUp, setActive } = useSignUp();

  const submitVerificationCode = async () => {
    try {
      const verifiedCode = await signUp.attemptPhoneNumberVerification({
        code: verificationCode,
      });

      if (verifiedCode) {
        const response = await axios.post(
          "http://192.168.100.168:3000/api/auth/login",
          {
            phoneNumber: verifiedCode.phoneNumber,
          }
        );

        // Handle response
        if (response.status === 200) {
          await setActive({ session: verifiedCode.createdSessionId });
          const userId = response.data.user.id;
          await AsyncStorage.setItem("userId", userId.toString());
          router.push(`/tenants/${userId}`);
        }
      } else {
        setWrongCodeMessage("Please enter a valid phone number");
        setTimeout(() => {
          setWrongCodeMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/app-background.jpg")} // Specify the background image
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <View className="flex items-center justify-center mt-24 mb-12">
        <KusurLogo width={140} height={35} />
      </View>
      <View className="bg-white m-4 p-3 rounded-lg flex  space-y-3">
        <View className="flex flex-row items-center justify-between mb-10">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon width={20} height={20} />
          </TouchableOpacity>
          <Text className="text-[#403F40] text-[18px] font-bold text-center flex self-center">
            Enter code you received
          </Text>
          <Text></Text>
        </View>
        <CustomInput
          label="SMS code"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        {wrongCodeMessage && (
          <Text className="text-red-400">{wrongCodeMessage}</Text>
        )}
        <TouchableOpacity
          onPress={submitVerificationCode}
          className="bg-[#3D44DB] w-[300px] flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
        >
          <Text className="text-[16px] text-white font-bold">Sign in</Text>
          <NextIcon width={20} height={16} fill="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 5,
    fontSize: 14,
    backgroundColor: "white",
    color: "#403F40CC",
    zIndex: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    borderRadius: 5,
  },
  countryCode: {
    paddingHorizontal: 7,
    fontSize: 14,
    color: "#403F40CC",
  },
  input: {
    flex: 1,
    padding: 7,
  },
});

export default VerifyScreen;
