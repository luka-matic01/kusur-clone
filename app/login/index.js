// LoginScreen.js
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { SplashScreen, useLocalSearchParams, useRouter } from "expo-router";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import SmsIcon from "../../assets/sms-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import AppleIcon from "../../assets/apple-icon.svg";
import FacebookIcon from "../../assets/facebook-icon.svg";
import { horizontalScale, verticalScale } from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const router = useRouter();
  const { params } = useLocalSearchParams();
  const [animate, setAnimate] = useState();

  const slideAnim2 = useRef(new Animated.Value(-250)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashScreen.hideAsync();

    const animation = async () => {
      const animateIt = await AsyncStorage.getItem("animation");
      setAnimate(animateIt);
      return animateIt;
    };

    animation().then((animateIt) => {
      if (animateIt === "yes") {
        Animated.timing(slideAnim2, {
          toValue: 0,
          duration: 600,
          easing: Easing.bounce,
          useNativeDriver: true,
        }).start();
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/app-background.jpg")} // Specify the background image
      style={{ flex: 1, justifyContent: "start", alignItems: "center" }}
      className="min-h-screen"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", paddingTop: verticalScale(120) }}>
          <KusurLogo width={horizontalScale(140)} height={verticalScale(40)} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: verticalScale(20),
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <View className="bg-white rounded-lg">
              <Animated.View
                className="flex items-center justify-center space-y-3"
                style={[
                  {
                    transform: [
                      {
                        translateX: animate === "yes" ? slideAnim2 : slideAnim,
                      },
                    ],
                    marginHorizontal: horizontalScale(20),
                    marginVertical: verticalScale(20),
                  },
                ]}
              >
                <Text
                  className="text-[#403F40]  font-[Roboto-Black]"
                  style={{ fontSize: horizontalScale(18) }}
                >
                  Login
                </Text>
                <TextInput
                  placeholder="E-mail*"
                  className="border  border-[#F3F4F6] p-2"
                  style={{
                    width: horizontalScale(310),
                    fontSize: horizontalScale(16),
                  }}
                />
                <TouchableOpacity
                  className="bg-[#3D44DB]  flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
                  style={{ width: horizontalScale(310) }}
                >
                  <Text
                    style={{ fontSize: horizontalScale(16) }}
                    className=" text-white font-[Roboto-Bold]"
                  >
                    Continue
                  </Text>
                  <NextIcon width={20} height={16} fill="white" />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "#F3F4F6" }}
                  />
                  <View>
                    <Text
                      style={{
                        width: horizontalScale(50),
                        textAlign: "center",
                        color: "#403F40",
                        fontSize: horizontalScale(18),
                      }}
                    >
                      or
                    </Text>
                  </View>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "#F3F4F6" }}
                  />
                </View>
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => router.push("/phoneNumber")}
                >
                  <View className="border border-[#E5E5E5] rounded-l-md flex items-center justify-center">
                    <View className="p-2">
                      <SmsIcon
                        width={horizontalScale(38)}
                        height={verticalScale(38)}
                        fill="black"
                      />
                    </View>
                  </View>
                  <View
                    className="border-t  border-b border-r border-[#E5E5E5]  flex items-center justify-center rounded-r-md"
                    style={{ width: horizontalScale(250) }}
                  >
                    <Text
                      style={{ fontSize: horizontalScale(16) }}
                      className=" font-[Roboto-Bold]"
                    >
                      Login with SMS
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row">
                  <View className="border border-[#E5E5E5] rounded-l-md flex items-center justify-center">
                    <View className="p-3">
                      <GoogleIcon
                        width={horizontalScale(30)}
                        height={verticalScale(30)}
                        fill="black"
                      />
                    </View>
                  </View>
                  <View
                    className="border-t  border-b border-r border-[#E5E5E5]  flex items-center justify-center rounded-r-md"
                    style={{ width: horizontalScale(250) }}
                  >
                    <Text
                      style={{ fontSize: horizontalScale(16) }}
                      className=" font-[Roboto-Bold] text-[#757575]"
                    >
                      Login with Google
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row bg-black rounded-md">
                  <View className="border border-[#E5E5E5] rounded-l-md flex items-center justify-center">
                    <View className="p-3">
                      <AppleIcon
                        width={horizontalScale(30)}
                        height={verticalScale(30)}
                        fill="white"
                      />
                    </View>
                  </View>
                  <View
                    className="border-t  border-b border-r border-[#E5E5E5]  flex items-center justify-center rounded-r-md"
                    style={{ width: horizontalScale(250) }}
                  >
                    <Text
                      style={{ fontSize: horizontalScale(16) }}
                      className=" font-[Roboto-Bold] text-white"
                    >
                      Login with Apple
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row bg-[#1877F1] rounded-md">
                  <View className="border border-[#E5E5E5] rounded-l-md flex items-center justify-center">
                    <View className="p-3">
                      <FacebookIcon
                        width={horizontalScale(30)}
                        height={verticalScale(30)}
                      />
                    </View>
                  </View>
                  <View
                    className="border-t  border-b border-r border-[#E5E5E5]  flex items-center justify-center rounded-r-md"
                    style={{ width: horizontalScale(250) }}
                  >
                    <Text
                      style={{ fontSize: horizontalScale(16) }}
                      className=" font-[Roboto-Bold] text-white"
                    >
                      Login with Facebook
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text
                  className="underline text-[#3D44DB] font-[Roboto-Regular]"
                  style={{ fontSize: horizontalScale(14) }}
                >
                  Explore App
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
