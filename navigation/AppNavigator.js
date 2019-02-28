import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ReviewTabNavigator from './ReviewTabNavigator';

import AuthNavigator from './AuthNavigator';

import LoginScreen from '../screens/audit_screens/LoginScreen'
import LoadingScreen  from '../screens/audit_screens/LoadingScreen'
import DashboardScreen from '../screens/audit_screens/DashboardScreen';



export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Login: LoginScreen,
  // Loading : LoadingScreen,
  // Dashboard : DashboardScreen,
  Main: MainTabNavigator,
  Review: ReviewTabNavigator
}));