import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ReviewTabNavigator from './ReviewTabNavigator';
import StoreScreen from '../screens/review_screens/AddStoreInfoScreen'

// import AuthNavigator from './AuthNavigator';

import LoginScreen from '../screens/audit_screens/LoginScreen'
import LoadingScreen  from '../screens/audit_screens/LoadingScreen'
import DashboardScreen from '../screens/audit_screens/DashboardScreen';



export default createAppContainer(createSwitchNavigator({
  Login: LoginScreen,
  // Loading : LoadingScreen,
  // Dashboard : DashboardScreen,

  Main: MainTabNavigator,
  Review: ReviewTabNavigator,
  Store: StoreScreen
}));