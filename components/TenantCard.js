import React from "react";
import { View, Text, Image } from "react-native";
import MoreIcon from "../assets/tenants/more-icon.svg";

const TenantCard = ({ tenant }) => {
  return (
    <View
      className="bg-white rounded-lg shadow-md p-4 flex-1 m-2"
      style={{ marginTop: 6, marginBottom: 20 }}
    >
      <View style={{ position: "relative",shadowColor: '#202020',
  shadowOffset: {width: 0, height: 0},
  shadowRadius: 5, }}>
        <Image
          source={{ uri: tenant.imageUrl }}
          style={{ width: 160, height: 160, borderRadius: 10 }}
        />
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 4,
            backgroundColor: "#d6d3d6",
            paddingHorizontal: 1,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <MoreIcon width={20} height={18} />
        </View>
      </View>
      <View className="p-2">
        {/* <Text className="text-gray-900 font-bold text-lg">{tenant.name}</Text> */}
        <Text className="text-gray-600">{tenant.description}</Text>
      </View>
    </View>
  );
};

export default TenantCard;
