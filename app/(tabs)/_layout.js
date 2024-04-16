import { Tabs } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import ReturnBack from "../../assets/returnBack-icon.svg";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import QrCodeIcon from "../../assets/qrCode-icon.svg";

const TabsLayout = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <Tabs screenOptions={{ tabBarStyle: { height: 60, paddingHorizontal: 6 } }}>
      <Tabs.Screen
        name="tenant/[slug]"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View className="flex items-center  mt-2">
                <MaterialIcons
                  name="redeem"
                  size={24}
                  color={focused ? "#3D44DB" : "black"}
                />
                <Text
                  style={{
                    color: focused ? "#3D44DB" : "black",
                    fontSize: 16,
                    fontWeight: focused ? "bold" : "normal",
                  }}
                >
                  Kuponi
                </Text>
              </View>
            );
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push(`/${userId}`)}
              className="ml-2"
            >
              <ReturnBack width={18} height={18} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
        }}
      />
      <Tabs.Screen
        name="offer"
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center mt-2">
              <MaterialIcons
                name="receipt-long"
                size={24}
                color={focused ? "#3D44DB" : "#403F40"}
              />
              <Text
                className={`${
                  focused
                    ? "text-[#3D44DB] font-[Roboto-Bold]"
                    : "text-[#403F40]"
                } text-[16px]`}
              >
                Ponuda
              </Text>
            </View>
          ),
          title: "",
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
        })}
      />
      <Tabs.Screen
        name="qrCode"
        options={() => ({
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  top: -10,
                  borderRadius: 50,
                  backgroundColor: "#3D44DB",
                }}
              >
                <QrCodeIcon width={35} height={35} />
              </View>
            );
          },
          title: "",
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
        })}
      />
      <Tabs.Screen
        name="info"
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center mt-2">
              <MaterialIcons
                name="info-outline"
                size={24}
                color={focused ? "#3D44DB" : "#403F40"}
              />
              <Text
                className={`${
                  focused
                    ? "text-[#3D44DB] font-[Roboto-Bold]"
                    : "text-[#403F40]"
                } text-[16px]`}
              >
                Info
              </Text>
            </View>
          ),
          title: "",
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
        })}
      />
      <Tabs.Screen
        name="other"
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center mt-2">
              <MaterialIcons
                name="more-horiz"
                size={24}
                color={focused ? "#3D44DB" : "#403F40"}
              />
              <Text
                className={`${
                  focused
                    ? "text-[#3D44DB] font-[Roboto-Bold]"
                    : "text-[#403F40]"
                } text-[16px]`}
              >
                Ostalo
              </Text>
            </View>
          ),
          title: "",
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
        })}
      />
    </Tabs>
  );
};

export default TabsLayout;
