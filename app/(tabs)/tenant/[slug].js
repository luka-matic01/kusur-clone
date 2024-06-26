import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CouponVoucherCard from "../../../components/CouponVoucherCard";
import * as Animatable from "react-native-animatable";
import { horizontalScale, verticalScale } from "../../../utils/helpers";

const TenantPage = () => {
  const navigation = useNavigation();
  const tenant = useLocalSearchParams();
  const [tenantData, setTenantData] = useState();
  const [selectedOption, setSelectedOption] = useState("coupons");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://backend-kusur-clone.onrender.com/api/tenant/${tenant.slug}`
        );
        setTenantData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    <ScrollView style={{ flex: 1 }} className="space-y-4 bg-white">
      <View
        style={{
          borderRadius: 6,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: verticalScale(20),
          paddingHorizontal: horizontalScale(24),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: horizontalScale(24),
        }}
        className="mx-4"
      >
        <View className="flex flex-col items-center">
          <Text
            className="font-bold text-[#403F40]"
            style={{ fontSize: horizontalScale(40) }}
          >
            {tenant.pointBalance}
          </Text>
          <Text
            className="font-[Roboto-Medium] text-[#403F40]"
            style={{ fontSize: horizontalScale(10) }}
          >
            Bodova ukupno
          </Text>
        </View>
        <View className="relative">
          <View className="flex items-center justify-center p-3 border-[#100F100F] border-2 rounded-lg border-opacity-90">
            <Text
              className="text-[#403F40] font-[Roboto-Black]"
              style={{ fontSize: horizontalScale(20) }}
            >
              30
            </Text>
            <Text
              className="text-[#403F40] font-[Roboto-Medium]"
              style={{ fontSize: horizontalScale(10) }}
            >
              Bodova potrebno
            </Text>
            <Text
              className="text-[#403F40] font-[Roboto-Medium]"
              style={{ fontSize: horizontalScale(10) }}
            >
              do Nove nagrade!
            </Text>
          </View>
        </View>
      </View>
      <View
        className="flex flex-row items-center space-x-4"
        style={{
          borderBottomWidth: 1,
          borderColor: "#3030300D",
        }}
      >
        <TouchableOpacity
          onPress={() => handleOptionSelect("coupons")}
          style={{
            borderBottomWidth: selectedOption === "coupons" ? 2 : 0,
            borderColor: "#3D44DB",
          }}
          className="ml-4"
        >
          <Text
            style={{
              paddingBottom: 6,
              fontSize: horizontalScale(16),
              color:
                selectedOption === "coupons"
                  ? "#3D44DB"
                  : `rgba(64, 63, 64, 0.5)`,
            }}
            className={`${
              selectedOption === "coupons"
                ? "text-[#3D44DB] font-[Roboto-Bold]"
                : "text-[#403F40] font-[Roboto-Regular]"
            } `}
          >
            Nagradni kuponi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionSelect("vouchers")}
          style={{
            borderBottomWidth: selectedOption === "vouchers" ? 2 : 0,
            borderColor: "#3D44DB",
          }}
        >
          <Text
            style={{
              paddingBottom: 6,
              fontSize: horizontalScale(16),
              color:
                selectedOption === "vouchers"
                  ? "#3D44DB"
                  : `rgba(64, 63, 64, 0.5)`,
            }}
            className={`${
              selectedOption === "vouchers"
                ? "text-[#3D44DB] font-[Roboto-Bold]"
                : "text-[#403F40] font-[Roboto-Regular]"
            }`}
          >
            Aktuelne ponude
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row flex-wrap justify-between mx-4">
        {selectedOption === "coupons" &&
          tenantData?.coupons.map((relUserTenant) => (
            <Animatable.View
              key={relUserTenant.id}
              animation="slideInLeft"
              duration={100}
            >
              <CouponVoucherCard card={relUserTenant} cardName="coupons" />
            </Animatable.View>
          ))}
        {selectedOption === "vouchers" &&
          tenantData?.vouchers.map((relUserTenant) => (
            <Animatable.View
              key={relUserTenant.id}
              animation="slideInRight"
              duration={100}
            >
              <CouponVoucherCard card={relUserTenant} cardName="vouchers" />
            </Animatable.View>
          ))}
      </View>
    </ScrollView>
  );
};

export default TenantPage;
