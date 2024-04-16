import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CouponVoucherCard from "../../../components/CouponVoucherCard";

const TenantPage = () => {
  const navigation = useNavigation();
  const tenant = useLocalSearchParams();
  const [tenantData, setTenantData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("coupons");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.168:3000/api/tenant/${tenant.slug}`
        );
        setTenantData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [tenant.id]);

  useEffect(() => {
    if (tenant && tenant.name) {
      navigation.setOptions({ headerTitle: tenant.name });
    }
  }, [tenant, navigation]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={{ flex: 1 }} className="mx-4 space-y-4">
      <View className="rounded-xl bg-white 6 p-6 flex flex-row items-center justify-between mt-6">
        <View className="flex flex-col items-center">
          <Text className="text-[36px] font-bold text-[#403F40]">
            {tenant.pointBalance}
          </Text>
          <Text className="text-[13px] font-bold text-[#403F40]">
            Bodova ukupno
          </Text>
        </View>
        <View className="relative">
          <View className="flex items-center justify-center p-3 border-[#100F100F] border-2 rounded-lg border-opacity-90">
            <Text className="text-[#403F40] font-bold text-[20px]">30</Text>
            <Text className="text-[#403F40] font-bold text-[13px]">
              Bodova potrebno
            </Text>
            <Text className="text-[#403F40] font-bold text-[13px]">
              do Nove nagrade!
            </Text>
          </View>
          <View className="absolute right-0 top-4 z-0">
            {/* <QuestionIcon width={45} height={45} /> */}
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={() => handleOptionSelect("coupons")}>
          <Text
            style={{
              borderBottomWidth: selectedOption === "coupons" ? 2 : 0,
              borderColor: "#3D44DB",
              paddingBottom: 6,
            }}
            className={`${
              selectedOption === "coupons"
                ? "text-[#3D44DB] font-bold"
                : "text-[#403F40]"
            } text-[16px]`}
          >
            Nagradni kuponi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionSelect("vouchers")}>
          <Text
            style={{
              borderBottomWidth: selectedOption === "vouchers" ? 2 : 0,
              borderColor: "#3D44DB",
              paddingBottom: 6,
            }}
            className={`${
              selectedOption === "vouchers"
                ? "text-[#3D44DB] font-bold"
                : "text-[#403F40]"
            } text-[16px]`}
          >
            Aktuelne ponude
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-between">
          {selectedOption === "coupons"
            ? tenantData?.coupons.map((relUserTenant) => (
                <CouponVoucherCard
                  card={relUserTenant}
                  key={relUserTenant.id}
                />
              ))
            : tenantData?.vouchers.map((relUserTenant) => (
                <CouponVoucherCard
                  card={relUserTenant}
                  key={relUserTenant.id}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TenantPage;
