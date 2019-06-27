import React from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Container, Header, Content, List, ListItem, Left, Right, Button } from "native-base";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "내 정보"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/robot-dev.png")} style={styles.image} />
            <Text style={styles.reviewer}>리뷰어</Text>
            <Text style={styles.reviewerName}>젠투펭귄</Text>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewNumber}>리뷰 개수</Text>
            <Text style={styles.reviewNumber2}>개</Text>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.account}>계정</Text>
          <Text style={styles.email}>이메일</Text>
        </View>
        <TouchableOpacity style={styles.bugContainer}>
          <Text style={styles.touchableText}>버그 제보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callingContainer}>
          <Text style={styles.touchableText}>담당자 연락</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6fa"
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 38,
    marginBottom: 38,
    borderRightWidth: 0.5,
    borderRightColor: "#efeff4"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  reviewer: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#292929"
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#292929"
  },
  reviewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewNumber: {
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "center",
    color: "#292929"
  },
  reviewNumber2: {
    marginTop: 11.8,
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "right",
    color: "#292929"
  },
  //
  accountContainer: {
    height: 44,
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  account: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: "#292929"
  },
  email: {
    marginRight: 16,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "right",
    color: "#8e8e93"
  },
  bugContainer: {
    height: 44,
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  callingContainer: {
    height: 44,
    flexDirection: "row",
    marginTop: 0.5,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  touchableText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: "#292929"
  }
});
