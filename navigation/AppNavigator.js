import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { Image, Button, Text, TouchableOpacity } from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import ReviewTabNavigator from "./ReviewTabNavigator";
import StoreScreen from "../screens/review_screens/AddStoreInfoScreen";
import LoginScreen from "../screens/audit_screens/LoginScreen";
// import AuthNavigator from './AuthNavigator';
// import LoadingScreen from "../screens/audit_screens/LoadingScreen";
// import DashboardScreen from "../screens/audit_screens/DashboardScreen";

class LogoTitle extends React.Component {
  render() {
    return <Text>lol</Text>;
  }
}

const LoginNavigationOptions = props => ({
  header: null
});

const MainNavigationOptions = props => ({
  header: null
});

const StoreNavigationOptions = props => ({
  title: "음식점 등록"
});

const ReviewNavigationOptions = props => ({
  title: "null",
  headerRight: (
    <TouchableOpacity
      style={{ width: 32, height: 21, marginRight: 16 }}
      onPress={() => alert("This is a button!")}
      color="#ffffff"
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "normal",
          lineHeight: 20,
          letterSpacing: 0,
          textAlign: "center",
          color: "#28b4f0"
        }}
      >
        저장
      </Text>
    </TouchableOpacity>
  )
});

export default createAppContainer(
  createStackNavigator(
    {
      Login: { screen: LoginScreen, navigationOptions: LoginNavigationOptions },
      // Loading : LoadingScreen,
      // Dashboard : DashboardScreen,
      Main: {
        screen: MainTabNavigator,
        navigationOptions: MainNavigationOptions
      },
      Store: { screen: StoreScreen, navigationOptions: StoreNavigationOptions },
      Review: {
        screen: ReviewTabNavigator,
        navigationOptions: ReviewNavigationOptions
      }
    },
    {
      initialRouteName: "Login",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "white",
          height: 64
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: "500",
          fontStyle: "normal",
          lineHeight: 20,
          letterSpacing: 0,
          textAlign: "left",
          color: "#292929"
        }
      }
    }
  )
);
