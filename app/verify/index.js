import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horizontalScale, verticalScale } from "../../utils/helpers";
import { MY_IP } from "@env";

const CustomInput = ({ label, errorMessage, value, onChangeText }) => (
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
    {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
  </View>
);

const VerifyScreen = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, setActive } = useSignUp();

  const submitVerificationCode = async () => {
    try {
      const verifiedCode = await signUp
        .attemptPhoneNumberVerification({
          code: verificationCode,
        })
        .catch((err) => {
          setErrorMessage(err.errors[0].longMessage);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
      if (verifiedCode) {
        const response = await axios.post(
          `http://${MY_IP}:3000/api/auth/login`,
          {
            phoneNumber: verifiedCode.phoneNumber,
          }
        );
        console.log(response);

        // Handle response
        if (response.status === 200) {
          await setActive({ session: verifiedCode.createdSessionId });
          const userId = response.data.user.id;
          await AsyncStorage.setItem("userId", userId.toString());
          router.push(`/home/${userId}`);
        }
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/app-background.jpg")} // Specify the background image
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View className="flex items-center justify-center mt-24 mb-12">
          <KusurLogo width={140} height={35} />
        </View>
        <View className="bg-white m-4 p-3 rounded-lg flex  space-y-3">
          <View className="flex flex-row items-center justify-between mb-10">
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcon width={20} height={20} />
            </TouchableOpacity>
            <Text className="text-[#403F40] text-[18px] font-[Roboto-Bold] text-center flex self-center">
              Enter code you received
            </Text>
            <Text></Text>
          </View>
          <CustomInput
            label="SMS code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            errorMessage={errorMessage}
          />
          <View className="flex items-center justify-center">
            <TouchableOpacity
              onPress={submitVerificationCode}
              className="bg-[#3D44DB] w-[300px] flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
            >
              <Text className="text-[16px] text-white font-[Roboto-Bold]">
                Sign in
              </Text>
              <NextIcon width={20} height={16} fill="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: horizontalScale(350),
  },
  label: {
    position: "absolute",
    top: verticalScale(-15),
    left: horizontalScale(5),
    fontSize: horizontalScale(16),
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
    paddingHorizontal: horizontalScale(7),
    fontSize: horizontalScale(16),
    color: "#403F40CC",
  },
  input: {
    flex: 1,
    padding: horizontalScale(7),
  },
  errorMessage: {
    color: "red",
    fontSize: horizontalScale(14),
    marginTop: verticalScale(5),
  },
});

export default VerifyScreen;
