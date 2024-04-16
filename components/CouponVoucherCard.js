import React from "react";
import { View, Text, Image } from "react-native";
import MoreIcon from "../assets/tenants/more-icon.svg";

const CouponVoucherCard = ({ card }) => {
  return (
    <View
      className="bg-white rounded-lg shadow-md p-4 flex-1 m-2"
      style={{ marginTop: 6, marginBottom: 20 }}
    >
      <View
        style={{
          position: "relative",
          shadowColor: "#202020",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 5,
        }}
      >
        <Image
          source={{ uri: card.imageUrl }}
          style={{ width: 160, height: 160, borderRadius: 10 }}
        />
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 4,
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
        <Text style={{ color: "#403F40", fontSize: 16, fontWeight: "bold" }}>
          {card.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              textDecorationLine: "line-through",
              marginRight: 5,
              color: "rgba(64, 63, 64, 0.4)",
              fontSize: 14,
            }}
          >
            {card.discountValue + 50} {card.currency}
          </Text>
          <Text style={{ color: "#403F40", fontSize: 14, fontWeight: "bold" }}>
            {card.discountValue} {card.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CouponVoucherCard;
