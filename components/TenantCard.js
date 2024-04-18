import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MoreIcon from "../assets/tenants/more-icon.svg";
import { router } from "expo-router";
import { horizontalScale, verticalScale } from "../utils/helpers";

const TenantCard = ({ tenant, pointBalance }) => {
  const name = tenant?.name;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/tenant/${tenant.id}`,
          params: { name, pointBalance },
        })
      }
    >
      <View
        className="bg-white rounded-lg shadow-md p-4 flex-1 m-2"
        style={{ marginTop: verticalScale(6), marginBottom: verticalScale(20) }}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            source={{ uri: tenant.imageUrl }}
            style={{
              width: horizontalScale(180),
              height: verticalScale(180),
              borderRadius: 10,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: verticalScale(8),
              right: horizontalScale(4),
              backgroundColor: "rgba(214, 211, 214, 0.6)",
              paddingHorizontal: 1,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <MoreIcon width={20} height={18} />
          </View>
        </View>
        <View className="p-2">
          <Text
            style={{
              color: "#403F40",
              fontSize: horizontalScale(18),
              fontFamily: "Roboto-Bold",
            }}
          >
            {tenant.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TenantCard;
