import React from "react";

import { Image, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";

import PropTypes from "prop-types";

import { StackActions, NavigationActions, withNavigation } from "react-navigation";

class StoreStatus extends React.Component {
  static defaultProps = {
    possibleReviewType: "000",
    registeredReviewType: "000",
    itemId: 0
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { possibleReviewType, registeredReviewType, itemId } = this.props;

    return this._checkSwitch1(possibleReviewType, registeredReviewType, itemId);
  }

  _checkSwitch1 = (param1, param2, id) => {
    switch (param1) {
      case "111":
        switch (param2) {
          case "111":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_111.png")} />
              </TouchableOpacity>
            );

          case "110":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_110.png")} />
              </TouchableOpacity>
            );

          case "101":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_101.png")} />
              </TouchableOpacity>
            );

          case "011":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_011.png")} />
              </TouchableOpacity>
            );

          case "100":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_100.png")} />
              </TouchableOpacity>
            );

          case "010":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_010.png")} />
              </TouchableOpacity>
            );

          case "001":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_001.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_111_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "110":
        switch (param2) {
          case "110":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_110_110.png")} />
              </TouchableOpacity>
            );

          case "100":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_110_100.png")} />
              </TouchableOpacity>
            );

          case "010":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_110_010.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_110_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "101":
        switch (param2) {
          case "101":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_101_101.png")} />
              </TouchableOpacity>
            );

          case "100":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_101_100.png")} />
              </TouchableOpacity>
            );

          case "001":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_101_001.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_101_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "011":
        switch (param2) {
          case "011":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_011_011.png")} />
              </TouchableOpacity>
            );

          case "010":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_011_010.png")} />
              </TouchableOpacity>
            );

          case "001":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_011_001.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_011_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "100":
        switch (param2) {
          case "100":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_100_100.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_100_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "010":
        switch (param2) {
          case "010":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_010_010.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_010_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "001":
        switch (param2) {
          case "001":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_001_001.png")} />
              </TouchableOpacity>
            );

          case "000":
            return (
              <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
                <Image style={styles.image} source={require("../../../assets/images/btn/btn_001_000.png")} />
              </TouchableOpacity>
            );
        }
        break;

      case "000":
        return (
          <TouchableOpacity style={styles.touch} onPress={() => this._Alert(param1, param2, id)}>
            <Image style={styles.image} source={require("../../../assets/images/btn/btn_000_000.png")} />
          </TouchableOpacity>
        );

      default:
        return (
          <TouchableOpacity style={styles.touch} onPress={() => this._Alert("000", "000", 0)}>
            <Image style={styles.image} source={require("../../../assets/images/btn/btn_000_000.png")} />
          </TouchableOpacity>
        );
    }
  };

  _Alert = (param1, param2, id) => {
    switch (Number(param1) - Number(param2)) {
      case 111:
        Alert.alert(
          "작성할 리뷰 종류를 선택해주세요",
          "",
          [
            { text: "음식점", onPress: () => this._navigateToReview(100, id) },
            { text: "술집", onPress: () => this._navigateToReview(10, id) },
            { text: "카페", onPress: () => this._navigateToReview(1, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 110:
        Alert.alert(
          "작성할 리뷰 종류를 선택해주세요",
          "",
          [
            { text: "음식점", onPress: () => this._navigateToReview(100, id) },
            { text: "술집", onPress: () => this._navigateToReview(10, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 101:
        Alert.alert(
          "작성할 리뷰 종류를 선택해주세요",
          "",
          [
            { text: "음식점", onPress: () => this._navigateToReview(100, id) },
            { text: "카페", onPress: () => this._navigateToReview(1, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 11:
        Alert.alert(
          "작성할 리뷰 종류를 선택해주세요",
          "",
          [
            { text: "술집", onPress: () => this._navigateToReview(10, id) },
            { text: "카페", onPress: () => this._navigateToReview(1, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 100:
        Alert.alert(
          "음식점 리뷰를 작성할까요?",
          "",
          [
            { text: "음식점", onPress: () => this._navigateToReview(100, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 10:
        Alert.alert(
          "술집 리뷰를 작성할까요?",
          "",
          [
            { text: "술집", onPress: () => this._navigateToReview(10, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 1:
        Alert.alert(
          "카페 리뷰를 작성할까요?",
          "",
          [
            { text: "카페", onPress: () => this._navigateToReview(1, id) },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );
        break;

      case 0:
        Alert.alert(
          "리뷰 작성이 불가능합니다.",
          "",
          [
            {
              text: "가게 정보 보기",
              onPress: () =>
                this.props.navigation.push("Store", {
                  itemId: id
                })
            },
            { text: "취소", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: true }
        );

        break;

      default:
        this.props.navigation.push("Store", {
          itemId: id
        });
        break;
    }

    
  };

  _navigateToReview = async (num, id) => {
    await this.props.navigation.navigate("Review", { itemId: id, review_type: num });
  };
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 30
  },
  touch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0faff"
  }
});

export default withNavigation(StoreStatus);
