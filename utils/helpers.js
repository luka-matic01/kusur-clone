import { Dimensions } from "react-native";
import { GUIDELINE_BASE_HEIGHT, GUIDELINE_BASE_WIDTH } from "./consts";

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
