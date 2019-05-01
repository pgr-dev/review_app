import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import {
  Image,
  Button,
  Text
} from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import ReviewTabNavigator from "./ReviewTabNavigator";
import StoreScreen from "../screens/review_screens/AddStoreInfoScreen";
import LoginScreen from "../screens/audit_screens/LoginScreen";
// import AuthNavigator from './AuthNavigator';
// import LoadingScreen from "../screens/audit_screens/LoadingScreen";
// import DashboardScreen from "../screens/audit_screens/DashboardScreen";

class LogoTitle extends React.Component {
  render() {
    return (
      <Text>lol</Text>
    );
  }
}

const LoginNavigationOptions = (props) => ({
  header : null
})

const MainNavigationOptions = (props) => ({
  header : null
})

const ReviewNavigationOptions = (props) => ({

})

const StoreNavigationOptions = (props) => ({
  headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
})



export default createAppContainer(
  createStackNavigator(
    {
      Login: {screen : LoginScreen, navigationOptions: LoginNavigationOptions},
      // Loading : LoadingScreen,
      // Dashboard : DashboardScreen,
      Main: {screen : MainTabNavigator, navigationOptions: MainNavigationOptions},
      Review: {screen : ReviewTabNavigator, navigationOptions: ReviewNavigationOptions},
      Store: {screen : StoreScreen, navigationOptions: StoreNavigationOptions},
    },
    {
      initialRouteName: "Login",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "white"
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }
    }
  )
);
