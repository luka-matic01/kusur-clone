import { Drawer } from "expo-router/drawer";
import PlusIcon from "../../assets/tenants/plus-icon.svg";
import { Text, TouchableOpacity, View } from "react-native";
import CustomDrawer from "../../components/CustomDrawer";

const HomeScreen = () => {
  return (
    <Drawer
      drawerContent={(props) => {
        return <CustomDrawer drawerPosition={undefined} {...props} />;
      }}
    >
      <Drawer.Screen
        name="[slug]" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "",
          headerRight: () => (
            <View className="flex flex-row items-center space-x-2 mr-2">
              <Text className="text-[#403F40] font-[Roboto-Bold] text-[14px]">
                Dodaj objekat
              </Text>
              <PlusIcon width={18} height={18} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

export default HomeScreen;
