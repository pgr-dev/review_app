import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

import ReviewInfoScreen from "../screens/review_screens/ReviewInfoScreen";
import ReviewCameraScreen from "../screens/review_screens/ReviewCameraScreen";
import ReviewWritingScreen from "../screens/review_screens/ReviewWritingScreen";

import { connect } from "react-redux";

const linkdata = require("../linkdata.json");

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
  // header: null,
  tabBarLabel: "리뷰"
};

const CameraStack = createStackNavigator({
  ReviewCamera: ReviewCameraScreen
});

CameraStack.navigationOptions = {
  header: null,
  tabBarLabel: "사진"
};

let ReviewTabNavigator = createMaterialTopTabNavigator(
  {
    InfoStack,
    WritingStack,
    CameraStack
    // Info : {screen : ReviewInfoScreen},
    // Writing : {screen : ReviewWritingScreen},
    // Camera : {screen : ReviewCameraScreen},
  },
  {
    tabBarOptions: {
      style: { marginTop: 70 },
      activeTintColor: "#28b4f0",
      inactiveTintColor: "#8e8e93",
      labelStyle: {
        fontSize: 16
      },
      tabStyle: {
        width: 120
      },
      style: {
        backgroundColor: "#f9f9fb"
      },
      indicatorStyle: {
        backgroundColor: "white"
      }
    }
  }
);

export default connect(state => ({ review: state.review, storeInfo: state.storeInfo }))(ReviewTabNavigator);
