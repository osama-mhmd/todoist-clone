import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleProp, View, ViewStyle } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#DE4C47",
        tabBarStyle: {
          backgroundColor: "#262626",
          height: 85,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          marginVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "relative" }}>
              <View style={tabStyle(focused)} />
              <FontAwesome size={30} name={"inbox"} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="upcomming"
        options={{
          title: "Upcomming",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "relative" }}>
              <View style={tabStyle(focused)} />
              <CalendarIcon color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const tabStyle = (focused: boolean): StyleProp<ViewStyle> => {
  return {
    position: "absolute",
    top: -6,
    left: -20,
    right: -20,
    bottom: -6,
    backgroundColor: focused ? "#4b2829" : "transparent",
    borderRadius: 16,
  };
};

import Svg, { Rect, Line } from "react-native-svg";

const CalendarIcon = ({ size = 30, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Line x1="6.5" y1="8.8" x2="17.5" y2="8.8" stroke={color} strokeWidth="2" />
    <Rect x="7" y="12" width="2" height="2" fill={color} />
    <Rect x="11" y="12" width="2" height="2" fill={color} />
    <Rect x="15" y="12" width="2" height="2" fill={color} />
    <Rect x="7" y="16" width="2" height="2" fill={color} />
    <Rect x="11" y="16" width="2" height="2" fill={color} />
    <Rect x="15" y="16" width="2" height="2" fill={color} />
  </Svg>
);
