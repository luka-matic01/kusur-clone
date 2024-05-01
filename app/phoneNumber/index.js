import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import Toast from "react-native-toast-message";
import { horizontalScale, verticalScale } from "../../utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomInput = ({ label, errorMessage, ...inputProps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Text style={styles.countryCode}>
        +387 <Text style={styles.inputOpacity}> │</Text>
      </Text>
      <TextInput
        {...inputProps}
        style={styles.input}
        keyboardType="number-pad"
      />
    </View>
    {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
  </View>
);

const LoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp } = useSignUp();
  const [errorMessage, setErrorMessage] = useState("");
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const sendVerificationCode = async () => {
    try {
      if (phoneNumber.length < 5) {
        setErrorMessage("Please enter a valid phone number");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      await signUp
        .create({
          phoneNumber: `+387${phoneNumber}`,
        })
        .catch((err) => {
          setErrorMessage(err.errors[0].message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });

      await signUp.preparePhoneNumberVerification();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "SMS code has been sent to Your phone number",
      });

      router.push("/verify");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/app-background.jpg")}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", paddingTop: verticalScale(120) }}>
          <KusurLogo width={horizontalScale(140)} height={verticalScale(40)} />
        </View>
        <View
          className="bg-white mb-2  rounded-lg flex  space-y-3"
          style={{
            paddingHorizontal: horizontalScale(15),
            paddingVertical: verticalScale(10),
          }}
        >
          <Animated.View
            className="flex flex-row items-center justify-between mb-10"
            style={[{ transform: [{ translateX: slideAnim }] }]}
          >
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.setItem("animation", "yes");
                router.push("/login");
              }}
            >
              <BackIcon width={20} height={20} />
            </TouchableOpacity>
            <Text className="text-[#403F40] text-[18px] font-[Roboto-Black] text-center flex self-center">
              Sign in with SMS
            </Text>
            <Text></Text>
          </Animated.View>
          <Animated.View
            style={[{ transform: [{ translateX: slideAnim }] }]}
            className="flex items-center justify-center"
          >
            <CustomInput
              label="Your number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              errorMessage={errorMessage}
            />
          </Animated.View>

          <View className="flex items-center justify-center">
            <Animated.View style={[{ transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity
                className="bg-[#3D44DB] flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
                onPress={sendVerificationCode}
                style={{ width: horizontalScale(320) }}
              >
                <Text className="text-[16px] text-white font-[Roboto-Bold]">
                  Send SMS code
                </Text>
                <NextIcon width={20} height={16} fill="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: horizontalScale(320),
  },
  label: {
    position: "absolute",
    top: verticalScale(-10),
    left: horizontalScale(5),
    fontSize: horizontalScale(12),
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
    borderRadius: 5,
  },
  countryCode: {
    paddingHorizontal: horizontalScale(8),
    fontSize: horizontalScale(15),
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
  inputOpacity: {
    flex: 1,
    color: "rgba(0, 0, 0, 0.1)",
    fontSize: horizontalScale(16),
  },
});

export default LoginScreen;
