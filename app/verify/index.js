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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horizontalScale, verticalScale } from "../../utils/helpers";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";

const CustomInput = ({ label, errorMessage, control, name, errors }) => (
  <View style={styles.container} className="w-[300px]">
    <Text
      style={[
        styles.label,
        { color: errors.verificationCode ? "red" : "#403F40CC" },
      ]}
    >
      {label}
    </Text>
    <View
      style={[
        styles.inputContainer,
        { borderColor: errors.verificationCode ? "red" : "#E5E5E5" },
      ]}
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
        rules={{
          required: true,
        }}
        defaultValue=""
      />
    </View>
    {errors.verificationCode && (
      <Text style={styles.errorMessage}>SMS code is required</Text>
    )}
    {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
  </View>
);

const VerifyScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, setActive } = useSignUp();

  const submitVerificationCode = async () => {
    try {
      const verifiedCode = await signUp
        .attemptPhoneNumberVerification({
          code: verificationCode,
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "SMS code is not valid or has expired",
          });
        });
      if (verifiedCode) {
        setIsLoading(true);
        const response = await axios.post(
          `https://backend-kusur-clone.onrender.com/api/auth/login`,
          {
            phoneNumber: verifiedCode.phoneNumber,
          }
        );

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
    } finally {
      setIsLoading(false);
    }
  };

  console.log(errors);

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
          <KusurLogo width={horizontalScale(140)} height={verticalScale(140)} />
        </View>
        <View
          className="bg-white m-4 p-3 rounded-lg flex  space-y-3"
          style={{ width: horizontalScale(380) }}
        >
          <View className="flex flex-row items-center justify-between mb-10">
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcon width={20} height={20} />
            </TouchableOpacity>
            <Text className="text-[#403F40] text-[18px] font-[Roboto-Bold] text-center flex self-center">
              Enter code you received
            </Text>
            <Text></Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#3D44DB" />
          ) : (
            <View className="flex flex-col items-center justify-center">
              <CustomInput
                label="SMS code"
                control={control}
                name="verificationCode"
                errorMessage={
                  errors.verificationCode && errors.verificationCode.message
                }
                errors={errors}
              />
            </View>
          )}
          <View className="flex items-center justify-center">
            <TouchableOpacity
              onPress={handleSubmit(submitVerificationCode)}
              className="bg-[#3D44DB] w-[300px] flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
              disabled={isLoading ? true : false}
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
    left: horizontalScale(12),
    fontSize: horizontalScale(16),
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(4),
    color: "#403F40CC",
    zIndex: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    paddingHorizontal: horizontalScale(10),
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
