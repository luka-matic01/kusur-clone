import React from "react";
import { View, Text, Image } from "react-native";
import { horizontalScale, verticalScale } from "../utils/helpers";

const CouponVoucherCard = ({ card, cardName }) => {
  return (
    <View
      className="bg-white rounded-lg shadow-md p-4 flex-1 m-2"
      style={{ marginTop: verticalScale(6), marginBottom: verticalScale(24) }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{ uri: card.imageUrl }}
          style={{
            width: horizontalScale(180),
            height: verticalScale(180),
            borderRadius: 10,
          }}
        />
      </View>
      <View className="p-2">
        <Text
          style={{
            color: "#403F40",
            fontSize: horizontalScale(18),
            fontFamily: "Roboto-Bold",
          }}
        >
          {card.name}
        </Text>
        {cardName === "coupons" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                textDecorationLine: "line-through",
                marginRight: 5,
                color: "rgba(64, 63, 64, 0.4)",
                fontSize: horizontalScale(16),
                fontFamily: "Roboto-Bold",
              }}
            >
              {card.discountValue + 50} {card.currency}
            </Text>
            <Text
              style={{
                color: "#403F40",
                fontSize: horizontalScale(16),
                fontFamily: "Roboto-Bold",
              }}
            >
              {card.discountValue} {card.currency}
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#E52A2A",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white", fontFamily: "Roboto-Medium" }}>
                -{card.discountValue} {card.currency}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CouponVoucherCard;
