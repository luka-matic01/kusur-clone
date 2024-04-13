import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import Toast from "react-native-toast-message";

const CustomInput = ({ label, ...inputProps }) => (
  <View style={styles.container} className="w-[300px]">
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Text style={styles.countryCode}>+387 │</Text>
      <TextInput
        {...inputProps}
        style={styles.input}
        keyboardType="number-pad"
      />
    </View>
  </View>
);

const LoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp } = useSignUp();
  const [errorMessage, setErrorMessage] = useState("");

  const sendVerificationCode = async () => {
    try {
      if (phoneNumber.length !== 8) {
        setErrorMessage("Please enter a valid phone number");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
      await signUp.create({
        phoneNumber: `+387${phoneNumber}`,
      });
      await signUp.preparePhoneNumberVerification();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "SMS code has been sent to Your phone number  👋",
      });
      // Navigate to the VerificationScreen and pass the verificationId as a prop
      router.push("/verify");
    } catch (error) {
      console.log(error);
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
            Sign in with SMS
          </Text>
          <Text></Text>
        </View>
        <CustomInput
          label="Your number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {errorMessage && <Text className="text-red-400">{errorMessage}</Text>}
        <TouchableOpacity
          className="bg-[#3D44DB] w-[300px] flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
          onPress={sendVerificationCode}
        >
          <Text className="text-[16px] text-white font-bold">
            Send SMS code
          </Text>
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

export default LoginScreen;
