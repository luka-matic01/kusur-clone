import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import axios from "axios";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import QuestionIcon from "../../assets/tenants/question-icon.svg";
import TenantCard from "../../components/TenantCard";
import { horizontalScale, verticalScale } from "../../utils/helpers";

const Tenants = () => {
  const { slug } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://backend-kusur-clone.onrender.com/api/users/${slug}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [slug]);

  if (loading) {
    return (
      <View className="h-screen flex items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userData) {
    return <Text>Error: User data not found</Text>;
  }

  // Calculate accumulated pointBalance
  const accumulatedPointBalance = userData.relusertenant.reduce(
    (total, relUserTenant) => total + relUserTenant.tenant.wallet.pointBalance,
    0
  );

  return (
    <ScrollView className="px-4 space-y-6 bg-white" style={{ flex: 1 }}>
      <View
        className="bg-[#3D44DB] rounded-xl 6 p-6 flex flex-row items-center justify-between"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.75,
          shadowRadius: 3.84,
          marginTop: verticalScale(15),
        }}
      >
        <View className="flex flex-col items-center">
          <Text
            className="font-[Roboto-Black] text-white"
            style={{ fontSize: horizontalScale(40) }}
          >
            {accumulatedPointBalance}
          </Text>
          <Text
            className="font-[Roboto-Medium] text-white"
            style={{ fontSize: horizontalScale(10) }}
          >
            Kusur bodova
          </Text>
        </View>
        <View className="relative">
          <View className="flex items-center justify-center p-4 border-[#665AF666] border-2 rounded-lg border-opacity-90">
            <Text
              className="text-white font-[Roboto-Medium]"
              style={{ fontSize: horizontalScale(10) }}
            >
              Šta su
            </Text>
            <Text
              className="text-white font-[Roboto-Medium]"
              style={{ fontSize: horizontalScale(10) }}
            >
              Kusur bodovi
            </Text>
          </View>
          <View
            className="z-0"
            style={{
              position: "absolute",
              right: horizontalScale(5),
              top: verticalScale(17),
            }}
          >
            <QuestionIcon
              width={horizontalScale(33)}
              height={verticalScale(43)}
            />
          </View>
        </View>
      </View>
      <View>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-[#403F40] font-[Roboto-Bold]"
            style={{ fontSize: horizontalScale(16) }}
          >
            Moji objekti
          </Text>
          <Text
            className="text-[#403F40] font-[Roboto-Medium]"
            style={{ fontSize: horizontalScale(12) }}
          >
            Filtriraj po kategoriji
          </Text>
        </View>
        <View className="flex flex-row flex-wrap justify-between mt-2">
          {userData.relusertenant.map((relUserTenant) => (
            <TenantCard
              key={relUserTenant.tenant.id}
              tenant={relUserTenant.tenant}
              pointBalance={relUserTenant.tenant.wallet.pointBalance}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Tenants;
