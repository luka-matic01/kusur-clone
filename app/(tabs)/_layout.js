import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import ReturnBack from "../../assets/returnBack-icon.svg";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <Tabs>
      <Tabs.Screen
        name="tenant/[slug]"
        options={{
          title: "Kuponi",
          headerStyle: { backgroundColor: "#3D44DB" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push(`/${userId}`)}
              className="ml-2"
            >
              <ReturnBack width={18} height={18} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          href: null,
          title: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
