import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/main_screens/HomeScreen";
import MyReviewInfoScreen from "../screens/main_screens/MyReviewInfoScreen";
import SettingsScreen from "../screens/main_screens/SettingsScreen";

const HomeStack = createStackNavigator({
  HomeScreen: HomeScreen
});

HomeStack.navigationOptions = {
  header: null,
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
};

const MyReviewInfoStack = createStackNavigator({
  MyReviewInfo: MyReviewInfoScreen
});

MyReviewInfoStack.navigationOptions = {
  tabBarLabel: "MyReview",
  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
};

export default createBottomTabNavigator(
  {
    HomeStack,
    MyReviewInfoStack,
    SettingsStack
  },
  {
    initialRouteName: "HomeStack",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" }
  }
);
