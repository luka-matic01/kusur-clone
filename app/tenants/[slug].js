import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Tenants = () => {
  const { slug } = useLocalSearchParams();
  console.log(slug);
  return <Text>Tenants</Text>;
};

export default Tenants;
