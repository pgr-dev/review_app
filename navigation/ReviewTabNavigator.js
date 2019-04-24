import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import ReviewInfoScreen from "../screens/review_screens/ReviewInfoScreen";
import ReviewCameraScreen from "../screens/review_screens/ReviewCameraScreen";
import ReviewWritingScreen from "../screens/review_screens/ReviewWritingScreen";

const InfoStack = createStackNavigator({
  ReviewInfo: ReviewInfoScreen
});

InfoStack.navigationOptions = {
  header: null,
  tabBarLabel: "정보"
};

const WritingStack = createStackNavigator({
  ReviewWriting: ReviewWritingScreen
});

WritingStack.navigationOptions = {
  header: null,
  tabBarLabel: "리뷰"
};

const CameraStack = createStackNavigator({
  ReviewCamera: ReviewCameraScreen
});

CameraStack.navigationOptions = {
  header: null,
  tabBarLabel: "사진"
};


export default createMaterialTopTabNavigator({
  InfoStack,
  WritingStack,
  CameraStack
},{
  tabBarOptions: {
    style: {marginTop : 70},
    activeTintColor: '#28b4f0',
    inactiveTintColor: '#8e8e93',
    labelStyle: {
      fontSize: 16,
    },
    tabStyle: {
      width: 120,
    },
    style: {
      backgroundColor: '#f9f9fb',
    },
    indicatorStyle : {
      backgroundColor: "white"
    }
  }
});
