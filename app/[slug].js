import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, View, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import PlusIcon from "../assets/tenants/plus-icon.svg";
import MenuIcon from "../assets/tenants/menu-icon.svg";
import QuestionIcon from "../assets/tenants/question-icon.svg";
import TenantCard from "../components/TenantCard";

const Tenants = () => {
  const { slug } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.168:3000/api/users/${slug}`
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
    return <ActivityIndicator size="large" />;
  }

  if (!userData) {
    return <Text>Error: User data not found</Text>;
  }

  return (
    <ScrollView className="p-3 mt-5 space-y-6">
      <View className="flex flex-row justify-between items-center">
        <MenuIcon width={20} height={20} />
        <View className="flex flex-row items-center space-x-2">
          <Text className="text-[#403F40] font-bold text-[14px]">
            Dodaj objekat
          </Text>
          <PlusIcon width={18} height={18} />
        </View>
      </View>
      <View className="bg-[#3D44DB] rounded-xl 6 p-6 flex flex-row items-center justify-between">
        <View className="flex flex-col items-center">
          <Text className="text-[36px] font-bold text-white">
            {userData.wallet.pointBalance}
          </Text>
          <Text className="text-[13px font-bold text-white">Kusur bodova</Text>
        </View>
        <View className="relative">
          <View className="flex items-center justify-center p-4 border-[#665AF666] border-2 rounded-lg border-opacity-90">
            <Text className="text-white font-bold text-[13px">Šta su</Text>
            <Text className="text-white font-bold text-[13px">Kusur bodovi</Text>
          </View>
          <View className="absolute right-0 top-4 z-0">
            <QuestionIcon width={45} height={45} />
          </View>
        </View>
      </View>
      <View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[#403F40] font-bold text-[18px]">
            Moji objekti
          </Text>
          <Text className="text-[#403F40] text-[13px]">
            Filtriraj po kategoriji
          </Text>
        </View>
        <View className="flex flex-row flex-wrap justify-between mt-3">
          {userData.relusertenant.map((relUserTenant) => (
            <TenantCard
              key={relUserTenant.tenant.id}
              tenant={relUserTenant.tenant}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Tenants;
