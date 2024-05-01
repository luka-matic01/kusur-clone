import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MenuIcon from "../assets/tenants/menu-icon.svg";
import ObjectIcon from "../assets/drawer/object-icon.svg";
import ProfileIcon from "../assets/drawer/profile-icon.svg";
import SettingsIcon from "../assets/drawer/settings-icon.svg";
import SurveyIcon from "../assets/drawer/survey-icon.svg";
import HowToIcon from "../assets/drawer/how-to-icon.svg";
import SupportIcon from "../assets/drawer/support-icon.svg";
import AboutIcon from "../assets/drawer/about-icon.svg";
import LogOutIcon from "../assets/drawer/logout-icon.svg";
import FacebookIcon from "../assets/facebook-icon.svg";
import InstagramIcon from "../assets/instagram-icon.svg";
import ShareIcon from "../assets/drawer/share-icon.svg";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horizontalScale, verticalScale } from "../utils/helpers";

const items = [
  {
    icon: <ObjectIcon width={horizontalScale(18)} height={verticalScale(18)} />,
    text: "Moji objekti",
  },
  {
    icon: (
      <ProfileIcon width={horizontalScale(18)} height={verticalScale(18)} />
    ),
    text: "Profil",
  },
  {
    icon: (
      <SettingsIcon width={horizontalScale(18)} height={verticalScale(18)} />
    ),
    text: "Postavke",
  },
  {
    icon: <SurveyIcon width={horizontalScale(18)} height={verticalScale(18)} />,
    text: "Ankete",
    isNew: true, // Add this flag for the "NEW" text
  },
  {
    icon: <HowToIcon width={horizontalScale(18)} height={verticalScale(18)} />,
    text: "How to?",
  },
  {
    icon: (
      <SupportIcon width={horizontalScale(18)} height={verticalScale(18)} />
    ),
    text: "Podrška",
  },
  {
    icon: <AboutIcon width={horizontalScale(18)} height={verticalScale(18)} />,
    text: "O nama",
  },
];

const CustomDrawer = (props) => {
  const { signOut } = useAuth();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await signOut();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: verticalScale(40),
          padding: horizontalScale(8),
          marginHorizontal: horizontalScale(8),
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MenuIcon width={horizontalScale(22)} height={verticalScale(22)} />
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: "#F3F4F6",
            marginBottom: verticalScale(14),
            marginTop: verticalScale(18),
          }}
        />
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignContent: "center",
              gap: horizontalScale(20),
              alignItems: "center",
              marginVertical: verticalScale(16),
            }}
          >
            {item.icon}
            <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: horizontalScale(17),
                  marginRight: item.isNew ? horizontalScale(8) : 0, // Add margin if "NEW" text is present
                }}
              >
                {item.text}
              </Text>
              {item.isNew && ( // Render "NEW" text if isNew flag is true
                <View
                  style={{
                    backgroundColor: "#FC68B1",
                    paddingHorizontal: horizontalScale(5),
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: verticalScale(-6),
                    right: horizontalScale(-37),
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Roboto-Medium",
                      fontSize: horizontalScale(12),
                    }}
                  >
                    NEW
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
        <View
          style={{
            height: 1,
            backgroundColor: "#F3F4F6",
            marginTop: verticalScale(16),
            marginBottom: verticalScale(26),
          }}
        />
        <TouchableOpacity
          onPress={logOut}
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: horizontalScale(20),
            alignItems: "center",
            marginBottom: verticalScale(8),
          }}
        >
          <LogOutIcon width={horizontalScale(18)} height={verticalScale(18)} />
          <Text
            style={{ fontFamily: "Roboto-Bold", fontSize: horizontalScale(17) }}
          >
            Odjavi se
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            gap: verticalScale(12),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: horizontalScale(12),
              paddingHorizontal: horizontalScale(8),
            }}
          >
            {/* Facebook */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#1771E6",
                paddingHorizontal: horizontalScale(12),
                paddingVertical: verticalScale(10),
                borderRadius: 2,
              }}
            >
              <FacebookIcon
                width={horizontalScale(18)}
                height={verticalScale(18)}
              />
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: horizontalScale(14),
                  marginLeft: horizontalScale(12),
                  color: "white",
                }}
              >
                Facebook
              </Text>
            </View>
            {/* Instagram */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#A82FB7",
                paddingHorizontal: horizontalScale(12),
                paddingVertical: verticalScale(10),
                borderRadius: 2,
              }}
            >
              <InstagramIcon
                width={horizontalScale(18)}
                height={verticalScale(18)}
              />
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: horizontalScale(14),
                  marginLeft: horizontalScale(8),
                  color: "white",
                }}
              >
                Instagram
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: verticalScale(16),
          }}
        >
          <ShareIcon width={horizontalScale(16)} height={verticalScale(16)} />
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: horizontalScale(15),
              marginLeft: verticalScale(8),
            }}
          >
            Podijeli aplikaciju
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
