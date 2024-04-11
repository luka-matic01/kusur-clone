import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Tenants = () => {
  const { slug } = useLocalSearchParams();
  console.log(slug);
  return <View>Tenants</View>;
};

export default Tenants;
