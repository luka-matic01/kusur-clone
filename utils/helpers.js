import { Dimensions, View } from "react-native";
import { GUIDELINE_BASE_HEIGHT, GUIDELINE_BASE_WIDTH } from "./consts";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

import SuccessIcon from "../assets/success.svg";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

/**
 * Scales a given size vertically based on the screen height and guideline base height.
 */
export const verticalScale = (size) => {
  const result = (screenHeight / GUIDELINE_BASE_HEIGHT) * parseFloat(size);
  return result;
};

/**
 * Scales a given size horizontally based on the screen height and guideline base height.
 */
export const horizontalScale = (size) => {
  const result = (screenWidth / GUIDELINE_BASE_WIDTH) * parseFloat(size);
  return result;
};

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#282fc5",
        borderLeftColor: "#282fc5",
        width: horizontalScale(350),
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(7),
        marginHorizontal: horizontalScale(6),
      }}
      text1Style={{
        fontSize: horizontalScale(16),
        fontFamily: "Roboto-Black",
        color: "white",
      }}
      renderLeadingIcon={() => (
        <View className="flex items-center justify-center mx-2">
          <SuccessIcon width={25} height={25} />
        </View>
      )}
      text2Style={{
        fontSize: horizontalScale(12),
        fontFamily: "Roboto-Regular",
        color: "white",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#282fc5",
        borderLeftColor: "#282fc5",
        width: horizontalScale(350),
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(7),
        marginHorizontal: horizontalScale(6),
      }}
      text1Style={{
        fontSize: horizontalScale(16),
        fontFamily: "Roboto-Black",
        color: "white",
      }}
      renderLeadingIcon={() => (
        <View className="flex items-center justify-center mx-2">
          <MaterialIcons name="error" size={horizontalScale(30)} color="red" />
        </View>
      )}
      text2Style={{
        fontSize: horizontalScale(12),
        fontFamily: "Roboto-Regular",
        color: "white",
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
