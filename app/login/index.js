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

const LoginScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/app-background.jpg")} // Specify the background image
      style={{ flex: 1, justifyContent: "start", alignItems: "center" }}
      className="min-h-screen"
    >
      <View className="flex items-center jsutify-center mt-24 mb-12">
        <KusurLogo width={140} height={35} />
      </View>

      <View className="flex justify-end">
        <View className="bg-white m-4 p-3 rounded-lg flex items-center justify-center space-y-3">
          <Text className="text-[#403F40] text-[18px] font-bold">Login</Text>
          <TextInput
            placeholder="E-mail*"
            className="border w-[300px] border-[#F3F4F6] p-2"
          />
          <View>
            <TouchableOpacity className="bg-[#3D44DB] w-[300px] flex items-center flex-row space-x-2 justify-center py-3 rounded-md">
              <Text className="text-[16px] text-white font-bold">Continue</Text>
              <NextIcon width={20} height={16} fill="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#F3F4F6" }} />
            <View>
              <Text
                style={{ width: 50, textAlign: "center", color: "#403F40" }}
                className="text-[16px]"
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
                <SmsIcon width={30} height={30} fill="black" />
              </View>
            </View>
            <View className="border-t  border-b border-r border-[#E5E5E5] w-[250px] flex items-center justify-center rounded-r-md">
              <Text className="text-[16px] font-bold">Login with SMS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
              <View className="p-3">
                <GoogleIcon width={25} height={25} fill="black" />
              </View>
            </View>
            <View className="border-t  border-b border-r border-[#E5E5E5] w-[250px] flex items-center justify-center rounded-r-md">
              <Text className="text-[16px] font-bold text-[#757575]">
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row bg-black rounded-md">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
              <View className="p-3">
                <AppleIcon width={25} height={25} fill="white" />
              </View>
            </View>
            <View className="border-t  border-b border-r border-[#E5E5E5] w-[250px] flex items-center justify-center rounded-r-md">
              <Text className="text-[16px] font-bold text-white">
                Login with Apple
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row bg-[#1877F1] rounded-md">
            <View className="border border-[#E5E5E5] w-[50px] rounded-l-md">
              <View className="p-3">
                <FacebookIcon width={25} height={25} />
              </View>
            </View>
            <View className="border-t  border-b border-r border-[#E5E5E5] w-[250px] flex items-center justify-center rounded-r-md">
              <Text className="text-[16px] font-bold text-white">
                Login with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="underline text-[14px] text-[#3D44DB]">
            Explore app
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
