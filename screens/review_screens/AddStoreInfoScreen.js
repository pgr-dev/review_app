import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";

import * as ImagePicker from "expo-image-picker";

import Immutable from "immutable";

import { RNS3 } from "react-native-aws3";

const linkdata = require("../../linkdata.json");

// class ItemList extends React.Component { 차후 리팩토링용 더미데이터, 작성중 상황에 따라 Text와 TextInput 변경 기능 추가 예정
//   render() {
//     const { storeDataWriting } = this.state;
//     const { placeholderName, valueName } = this.props;

//     return storeDataWriting
//       ? <ListItem>
//           <TextInput
//             placeholder="주소"
//             value={storeInfo.get("address")}
//             onChangeText={this._addressTextChange}
//           />
//         </ListItem>
//       : <ListItem>
//           <Text>
//             {storeInfo.get("address")}
//           </Text>
//         </ListItem>;
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
    console.log(this.state.itemID);
    this._networkingStoreData();
  };

  render() {
    let { itemID, storeDataReceivied, storeInfo, storeImage, IsStoreInfoChanged, IsStoreImageChanged } = this.state;

    return (
      <View style={styles.container}>
        {storeDataReceivied ? (
          <Container>
            <Content>
              <List>
                <ListItem itemDivider style={{ height: 50 }}>
                  <Text style={styles.itemDivider}>간판 사진{itemID}</Text>
                </ListItem>
                <ListItem style={{ height: 293 }} onPress={this._pickImage}>
                  {storeImage ? (
                    <Image
                      source={{ uri: storeImage.uri }}
                      style={{ width: 200, height: 200 }}
                    />
                  ) : (
                    <Text>take your picture</Text>
                  )}
                </ListItem>
                <ListItem
                  itemDivider
                  style={{ height: 75, flexDirection: "column" }}
                >
                  <Text style={styles.itemDivider}>
                    간판의 내용이 모두 보이도록 사진을 찍어 주세요.
                  </Text>
                  <Text style={styles.itemDivider}>주소</Text>
                </ListItem>
                <ListItem>
                  <TextInput
                    placeholder="주소"
                    value={storeInfo.get("address")}
                    onChangeText={this._addressTextChange}
                  />
                </ListItem>
                <ListItem>
                  <TextInput
                    placeholder="층"
                    value={storeInfo.get("floor")}
                    onChangeText={this._floorTextChange}
                  />
                </ListItem>
                <ListItem itemDivider />
                <ListItem>
                  <TextInput
                    placeholder="음식점 이름"
                    value={storeInfo.get("name")}
                    onChangeText={this._nameTextChange}
                  />
                </ListItem>
                <ListItem>
                  <TextInput
                    placeholder="지점 이름"
                    value={storeInfo.get("branch_name")}
                    onChangeText={this._branch_nameTextChange}
                  />
                </ListItem>
                <ListItem itemDivider />
                <ListItem>
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
          {IsStoreInfoChanged ?           <TouchableOpacity
            onPress={this._saveStoreData}
            style={styles.registerButton}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              음식점 등록
            </Text>
          </TouchableOpacity> :           <View
            style={styles.noneregisterButton}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              음식점 등록
            </Text>
          </View>}

        </View>
      </View>
    );
  }

  _pickImage = async () => {
    //사진 선택 기능
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        storeImage: result,
        IsStoreImageChanged: true,
        IsStoreInfoChanged: true
      });
    }
    console.log(this.state.storeImage);
  };

  _networkingStoreData = async () => {
    //서버로부터 정보를 받음

    const { itemID, storeInfo, storeDataReceivied, storeImage } = this.state;

    try {
      let URL = linkdata.apiLink + "/" + itemID; //요청할 서버 주소
      console.log(URL);
      console.log("awaiting response...");

      let response = await fetch(URL, {
        method: "GET"
      });
      let sData = await response.json();
      if (sData) {
        console.log("received response...");
        console.log(sData);
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
        console.log(storeInfo, storeDataReceivied);
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

  _saveStoreData = () => {
    //서버로 정보를 보냄

    const {
      itemID,
      storeInfo,
      storeDataReceivied,
      storeImage,
      IsStoreImageChanged,
      IsStoreInfoChanged
    } = this.state;

    if (IsStoreInfoChanged) {
      //가게정보 변경 시 감지
      try {
        //사진이 없거나 바뀌어졌을 시 서버로 통신
        if (IsStoreImageChanged) {
          const file = {
            uri: storeImage.uri,
            name: "sampleImage",
            type: "image/jpg"
          };
          console.log(file);

          const options = {
            keyPrefix: "s3/storeImage/",
            bucket: "pgr-testads",
            region: "ap-northeast-2",
            accessKey: "AKIAIREQRCQSIVSS4FAQ",
            secretKey: "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",
            successActionStatus: 201
          };

          console.log("awaiting camera response...");

          RNS3.put(file, options).then(response => {
            if (response.status !== 201)
              throw new Error("Failed to upload image to S3");
            console.log(response.body);
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
        }

        console.log("사진 안보낼꼬얌!!!");
        //가게 정보 통신
        let URL =
          linkdata.apiLink +
          "?input=" +
          this.state.storeName; //서버 주소
        console.log(URL);
        console.log("awaiting info response...not now");
      } catch (error) {
        console.error(error);
      }
    }
    else{
      console.log("가게정보 안보낼꼬얌!!!");
    }

    this.props.navigation.pop(1);
  };

  //아래 코드들 리팩토링 필수
  _addressTextChange = text => {
    this.setState({
      storeInfo: this.state.storeInfo.set("address", text),
      IsStoreInfoChanged: true
    });

    console.log(this.state.storeInfo.get("address"));
  };

  _floorTextChange = text => {
    this.setState({
      storeInfo: this.state.storeInfo.set("floor", text),
      IsStoreInfoChanged: true
    });

    console.log(this.state.storeInfo.get("floor"));
  };

  _nameTextChange = text => {
    this.setState({
      storeInfo: this.state.storeInfo.set("name", text),
      IsStoreInfoChanged: true
    });

    console.log(this.state.storeInfo.get("name"));
  };

  _branch_nameTextChange = text => {
    this.setState({
      storeInfo: this.state.storeInfo.set("branch_name", text),
      IsStoreInfoChanged: true
    });

    console.log(this.state.storeInfo.get("branch_name"));
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
