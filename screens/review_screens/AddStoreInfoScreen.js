import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Button, Icon } from "native-base";

import * as ImagePicker from "expo-image-picker";

import Immutable from "immutable";

import { RNS3 } from "react-native-aws3";

import { uuidv3 } from "uuid/v3";

import PropTypes from "prop-types";

const linkdata = require("../../linkdata.json");

// class ItemList extends React.Component {
//   //차후 리팩토링용 더미데이터

//   constructor(props) {
//     //
//     super(props);
//     this.state = { storeInfo: storeInfo, text: props.text };
//   }

//   static propTypes = {
//     placeholderName: PropTypes.string.isRequired,
//     valueName: PropTypes.string.isRequired,
//     order: PropTypes.number.isRequired,

//   };

//   render() {
//     const { placeholderName, valueName, order } = this.props;
//     <View>
//       <TextInput
//         placeholder = {placeholderName}
//         value={storeInfo.get(valueName)}
//         onChangeText={this._TextChange(valueName)}
//         returnKeyType={"next"}
//         onSubmitEditing={() => {
//           this.TextInput1.focus();
//         }}
//         ref={input => {
//           this.TextInput2 = input;
//         }}
//         blurOnSubmit={false}
//       />
//     </View>;
//   }
// }

export default class ReviewInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "0");
    this.state = {
      itemID: JSON.stringify(itemId), //Homescreen에서 받아온 파라메터
      storeDataReceivied: true, //
      storeDataWriting: true, //
      storeInfo: Immutable.Map({}), //
      storeImage: null, //
      IsStoreImageChanged: false,
      IsStoreInfoChanged: false
    };
  }

  componentDidMount = () => {
    console.log("현재 페이지의 ID : " + this.state.itemID);
    this._networkingStoreData();
  };

  render() {
    let { itemID, storeDataReceivied, storeInfo, storeImage, IsStoreInfoChanged, IsStoreImageChanged } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        {storeDataReceivied ? (
          <Container>
            <Content>
              <List>
                <ListItem itemDivider style={{ height: 50 }}>
                  <Text style={styles.itemDivider}>간판 사진{itemID}</Text>
                </ListItem>
                <ListItem style={{ height: 293 }} onPress={this._pickImage}>
                  {storeImage ? (
                    <Image source={{ uri: storeImage.uri }} style={{ width: 200, height: 200 }} />
                  ) : (
                    <Text>take your picture</Text>
                  )}
                </ListItem>
                <ListItem itemDivider style={{ height: 75, flexDirection: "column" }}>
                  <Text style={styles.itemDivider}>간판의 내용이 모두 보이도록 사진을 찍어 주세요.</Text>
                  <Text style={styles.itemDivider}>주소</Text>
                </ListItem>
                <ListItem>
                  <TextInput
                    placeholder="주소"
                    value={storeInfo.get("address")}
                    onChangeText={this._addressTextChange}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.TextInput1.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </ListItem>
                <ListItem>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    placeholder="층"
                    value={`${storeInfo.get("floor")}`}
                    onChangeText={this._floorTextChange}
                    ref={input => {
                      this.TextInput1 = input;
                    }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.TextInput2.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </ListItem>
                <ListItem itemDivider />
                <ListItem>
                  <TextInput
                    placeholder="음식점 이름"
                    value={storeInfo.get("name")}
                    onChangeText={this._nameTextChange}
                    ref={input => {
                      this.TextInput2 = input;
                    }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.TextInput3.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </ListItem>
                <ListItem>
                  <TextInput
                    placeholder="지점 이름"
                    value={storeInfo.get("branch_name")}
                    onChangeText={this._branch_nameTextChange}
                    ref={input => {
                      this.TextInput3 = input;
                    }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.TouchableOpacity.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </ListItem>
                <ListItem itemDivider />
                <ListItem style={{ marginBottom: 50 }}>
                  <Text>리뷰 유형 {storeInfo.get("review_type")}</Text>
                  <View>
                    <TouchableOpacity />
                    <TouchableOpacity />
                    <TouchableOpacity />
                  </View>
                </ListItem>
              </List>
            </Content>
          </Container>
        ) : (
          <ActivityIndicator />
        )}
        <View style={styles.registerButtonContainer}>
          {IsStoreInfoChanged ? (
            <TouchableOpacity
              ref={input => {
                this.TouchableOpacity = input;
              }}
              onPress={this._saveAlert}
              style={styles.registerButton}
            >
              <Text style={{ color: "white", textAlign: "center" }}>음식점 등록</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.noneregisterButton}>
              <Text style={{ color: "white", textAlign: "center" }}>음식점 등록</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }

  _pickImage = async () => {
    //사진 선택 기능
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    console.log("사진 선택됨!\n사진 객체 결과 : ");
    console.log(result);
    console.log("데이터 끝\n");

    if (!result.cancelled) {
      this.setState({
        storeImage: result,
        IsStoreImageChanged: true,
        IsStoreInfoChanged: true
      });
    }
    console.log("사진 저장됨!\n저장된 사진 객체 결과 : ");
    console.log(this.state.storeImage);
    console.log("데이터 끝\n");
  };

  _networkingStoreData = async () => {
    //서버로부터 정보를 받음

    const { itemID, storeInfo, storeDataReceivied, storeImage, IsStoreImageChanged, IsStoreInfoChanged } = this.state;

    try {
      let URL = linkdata.apiLink + "/restaurants/" + itemID; //요청할 서버 주소
      console.log("통신 대상 URL : " + URL);
      console.log("통신 목적 : 가게 ID에 따른 가게 정보 받아오기");
      console.log("\n*************************서버 응답 대기중*************************\n");

      let response = await fetch(URL, {
        method: "GET"
      });
      let sData = await response.json();
      if (sData) {
        console.log("\n***********************서버로부터 응답 받음***********************\n");
        console.log("데이터 확인!\n서버로부터 받은 데이터를 아래에 표시");
        console.log(sData);
        console.log("데이터 끝\n");
        this.setState({
          storeDataReceivied: true,
          storeInfo: Immutable.Map({ ...sData })
        });
        if (storeInfo.pic) {
          this.setState({
            storeImage: storeInfo.pic,
            IsStoreImageChanged: false,
            IsStoreInfoChanged: false
          });
        }
        console.log("storeInfo 저장하는 데이터 : " + storeInfo);
        console.log("storeDataReceivied  상태 : " + storeDataReceivied);
        console.log("storeImage          상태 : " + storeImage);
        console.log("IsStoreImageChanged 상태 : " + IsStoreImageChanged);
        console.log("IsStoreInfoChanged  상태 : " + IsStoreInfoChanged);
        return;
      } else {
        this.setState({
          storeDataReceivied: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  _saveAlert = () => {
    Alert.alert(
      "저장하시겠습니까?",
      "",
      [
        { text: "네", onPress: this._saveStoreData },
        {
          text: "아니오",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  _saveStoreData = async () => {
    //서버로 정보를 보냄

    const { itemID, storeInfo, storeDataReceivied, storeImage, IsStoreImageChanged, IsStoreInfoChanged } = this.state;

    try {
      if (IsStoreInfoChanged) {
        //가게정보 변경 시 감지
        //사진이 없거나 바뀌어졌을 시 서버로 통신
        if (IsStoreImageChanged) {
          const file = {
            uri: storeImage.uri,
            name: "store_" + storeInfo.id + "_" + storeInfo.name,
            type: "image/jpg"
          };
          console.log("보낼 사진 데이터 확인 : ");
          console.log(file);
          console.log("데이터 끝\n");

          const options = {
            keyPrefix: "s3/storeImage/",
            bucket: "pgr-testads",
            region: "ap-northeast-2",
            accessKey: "AKIAIREQRCQSIVSS4FAQ",
            secretKey: "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",
            successActionStatus: 201
          };
          console.log("보낼 사진 데이터 설정 확인 : ");
          console.log(options);
          console.log("데이터 끝\n");
          console.log("\n*************************서버 응답 대기중*************************\n");

          RNS3.put(file, options).then(response => {
            if (response.status !== 201) throw new Error("Failed to upload image to S3");
            console.log("\n***********************서버로부터 응답 받음***********************\n");
            console.log("받은 응답 확인 : ");
            console.log(response.body);
            console.log("데이터 끝\n");
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
          });
        } else {
          console.log("\n사진 안보낼꼬얌!!!\n");
        }

        //가게 정보 통신
        let URL = linkdata.apiLink + "/restaurants/" + itemID + "/"; //서버 주소
        console.log("통신 대상 URL : " + URL);
        console.log("통신 목적 : 가게 정보 수정 후 서버에 업로드");
        console.log("\n*************************서버 응답 대기중*************************\n");
        console.log(storeInfo);
        console.log(JSON.stringify(storeInfo));

        let response = await fetch(URL, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(storeInfo)
        });
        if (response) {
          console.log("\n***********************서버로부터 응답 받음***********************\n");
          console.log("받은 응답 확인 : ");
          console.log(response);
          console.log("데이터 끝\n");
          this.setState({
            IsStoreInfoChanged: false,
            IsStoreImageChanged: false
          });
          console.log("IsStoreInfoChanged  상태: " + IsStoreInfoChanged);
          console.log("IsStoreImageChanged 상태: " + IsStoreImageChanged);
        } else {
          console.log("\n***********************서버로부터 응답 실패***********************\n");
          console.log("\n***********************!!실패실패실패실패!!***********************\n");

          this.setState({
            IsStoreInfoChanged: false,
            IsStoreImageChanged: false
          });
        }
      } else {
        console.log("가게정보 안보낼꼬얌!!!");
      }
    } catch (error) {
      console.error(error);
    }

    this.props.navigation.pop(1);
  };

  //아래 코드들 리팩토링 필수

  _addressTextChange = async text => {
    await this.setState({
      storeInfo: this.state.storeInfo.set("address", text),
      IsStoreInfoChanged: true
    });

    console.log("현재 주소 : " + this.state.storeInfo.get("address"));
  };

  _floorTextChange = async text => {
    await this.setState({
      storeInfo: this.state.storeInfo.set("floor", text),
      IsStoreInfoChanged: true
    });

    console.log("현재 층 : " + this.state.storeInfo.get("floor"));
  };

  _nameTextChange = async text => {
    await this.setState({
      storeInfo: this.state.storeInfo.set("name", text),
      IsStoreInfoChanged: true
    });

    console.log("현재 가게이름 : " + this.state.storeInfo.get("name"));
  };

  _branch_nameTextChange = async text => {
    await this.setState({
      storeInfo: this.state.storeInfo.set("branch_name", text),
      IsStoreInfoChanged: true
    });

    console.log("현재 가맹점 이름 : " + this.state.storeInfo.get("branch_name"));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#d1d1d6"
  },
  header: {
    backgroundColor: "white",
    height: 64,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  itemDivider: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8e8e93"
  },
  registerButtonContainer: {
    width: "100%",
    paddingRight: 8,
    paddingLeft: 8,
    position: "absolute",
    bottom: 0,
    height: 60,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#d1d1d6",
    justifyContent: "center",
    alignItems: "stretch"
  },
  noneregisterButton: {
    backgroundColor: "#c7c7cc",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  registerButton: {
    backgroundColor: "#28b4f0",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  }
});
