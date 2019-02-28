import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import ReviewInfoScreen from "../screens/review_screens/ReviewInfoScreen";
import ReviewCameraScreen from "../screens/review_screens/ReviewCameraScreen";
import ReviewWritingScreen from "../screens/review_screens/ReviewWritingScreen";
import AddStoreInfoScreen from "../screens/review_screens/AddStoreInfoScreen";

const InfoStack = createStackNavigator(
  {
    AddStore: AddStoreInfoScreen,
    ReviewInfo: ReviewInfoScreen
  },
  {
    initialRouteName: "AddStore"
  }
);

const CameraStack = createStackNavigator({
  ReviewCamera: ReviewCameraScreen
});

const WritingStack = createStackNavigator({
  ReviewWriting: ReviewWritingScreen
});

export default createMaterialTopTabNavigator({
  InfoStack,
  CameraStack,
  WritingStack
});
