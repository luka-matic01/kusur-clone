// LoginScreen.js
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import KusurLogo from "../../assets/kusur-logo.svg";
import NextIcon from "../../assets/next.svg";
import SmsIcon from "../../assets/sms-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import AppleIcon from "../../assets/apple-icon.svg";
import FacebookIcon from "../../assets/facebook-icon.svg";
import { horizontalScale, verticalScale } from "../../utils/helpers";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/app-background.jpg")} // Specify the background image
      style={{ flex: 1, justifyContent: "start", alignItems: "center" }}
      className="min-h-screen"
    >
      <View
        className="flex items-center jsutify-center"
        style={{
          marginTop: verticalScale(120),
          marginBottom: verticalScale(60),
        }}
      >
        <KusurLogo width={horizontalScale(140)} height={verticalScale(35)} />
      </View>

      <View className="flex justify-end">
        <View className="bg-white m-4 p-3 rounded-lg flex items-center justify-center space-y-3">
          <Text className="text-[#403F40] text-[18px] font-[Roboto-Black]">
            Login
          </Text>
          <TextInput
            placeholder="E-mail*"
            className="border  border-[#F3F4F6] p-2"
            style={{ width: horizontalScale(350) }}
          />
          <TouchableOpacity
            className="bg-[#3D44DB]  flex items-center flex-row space-x-2 justify-center py-3 rounded-md"
            style={{ width: horizontalScale(350) }}
          >
            <Text
              style={{ fontSize: horizontalScale(18) }}
              className=" text-white font-[Roboto-Bold]"
            >
              Continue
            </Text>
            <NextIcon width={20} height={16} fill="white" />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#F3F4F6" }} />
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
            <View style={{ flex: 1, height: 1, backgroundColor: "#F3F4F6" }} />
          </View>
          <TouchableOpacity
            className="flex flex-row"
            onPress={() => router.push("/phoneNumber")}
          >
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
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
              style={{ width: horizontalScale(300) }}
            >
              <Text
                style={{ fontSize: horizontalScale(18) }}
                className=" font-[Roboto-Bold]"
              >
                Login with SMS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
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
              style={{ width: horizontalScale(300) }}
            >
              <Text
                style={{ fontSize: horizontalScale(18) }}
                className=" font-[Roboto-Bold] text-[#757575]"
              >
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row bg-black rounded-md">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
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
              style={{ width: horizontalScale(300) }}
            >
              <Text
                style={{ fontSize: horizontalScale(18) }}
                className=" font-[Roboto-Bold] text-white"
              >
                Login with Apple
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row bg-[#1877F1] rounded-md">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
              <View className="p-3">
                <FacebookIcon
                  width={horizontalScale(30)}
                  height={verticalScale(30)}
                />
              </View>
            </View>
            <View
              className="border-t  border-b border-r border-[#E5E5E5]  flex items-center justify-center rounded-r-md"
              style={{ width: horizontalScale(300) }}
            >
              <Text
                style={{ fontSize: horizontalScale(18) }}
                className=" font-[Roboto-Bold] text-white"
              >
                Login with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="underline text-[14px] text-[#3D44DB] font-[Roboto-Regular]">
            Explore app
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
