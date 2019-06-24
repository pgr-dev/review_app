import React from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator,
  Icon,
  Dimensions
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Button
} from "native-base";

import axios from "axios";

import { Marker } from "expo";

import MapView from "react-native-maps";

const linkdata = require("../../linkdata.json");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      textSearched: false,
      textSearching: false,
      mapSearched: false,
      mapSearching: false,
      restaurants: [],
      region: {
        latitude: 35.227703,
        longitude: 126.839799,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      superheight: 563
    };
  }

  static navigationOptions = {
    header: null
  };

  _onRegionChange = region => {
    this.setState({ region: region });
    // console.log(this.state.region)
  };

  //render start--------------------------------------------------------------------------------------------

  render() {
    const {
      storeName,
      textSearched,
      textSearching,
      restaurants,
      region,
      mapSearched,
      mapSearching
    } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView
            style={
              textSearched
                ? { flex: 0.4, maxHeight: 281 }
                : styles.mapHighConatiner
            }
            onLayout={event => {
              this.setState({
                superheight: event.nativeEvent.layout.height
              });
            }}
          >
            <MapView
              style={{
                height: this.state.superheight
              }}
              initialRegion={region}
              onRegionChange={this._onRegionChange}
              onLongPress={(event) => this._mapStoreSearch(event.nativeEvent)}
              loadingEnabled={true}
            >
              {textSearched ? (
                restaurants.map(markerinfo => (
                  <MapView.Marker
                    key={markerinfo.order}
                    coordinate={markerinfo.marker.LatLng}
                    title={markerinfo.name}
                    description={markerinfo.marker.branch_name}
                  />
                ))
              ) : (
                <View />
              )}
            </MapView>
          </ScrollView>

          <View style={styles.searchBarContainer}>
            <TextInput
              value={storeName}
              style={styles.searchBarTextInput}
              placeholder="펭귄리포트"
              returnKeyType={"done"}
              autoCorrect={false}
              onChangeText={this._searchTextChange}
              onSubmitEditing={this._searchStoreName}
            />
            {textSearched ? (
              <Button
                style={styles.searchBarButton}
                onPressOut={this._searchCancled}
              />
            ) : (
              <View style={{ height: 0 }} />
            )}
          </View>
        </KeyboardAvoidingView>

        {textSearched ? ( //서치 후 나타나는 창
          <ScrollView style={{ flex: 0.4, maxHeight: 282 }}>
            <View style={styles.textSearchedContainer}>
              {restaurants.map(store => (
                <TouchableOpacity
                  key={store.order}
                  style={styles.ListItem}
                  onPress={() =>
                    this.props.navigation.push("Store", {
                      itemId: store.id
                    })
                  }
                >
                  <View>
                    <Text>
                      {store.order}.{store.name}
                      {store.branch_name ? store.branch_name : ""}
                    </Text>
                    <Text>{store.address}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("Review", {
                          itemId: store.id
                        })
                      }
                    >
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          backgroundColor: "red"
                        }}
                      >
                        {/* <StoreStatus                              가게의 종류를 보여주는 버튼 구현 예정
                          isWritten={store.status.isWritten}
                          storeType={store.status.storeType}
                        /> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : textSearching ? (
          <View style={{ height: 50 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ height: 0 }} />
        )}
      </View>
    );
  }

  //function start----------------------------  ------------------------------------------------------------------------------------------------------------------------

  _searchTextChange = async text => {
    // 텍스트 변경 될 시 state인 storeName 현재 값인 text를 넣는다.
    await this.setState({
      storeName: text
    });

    console.log("현재 storeName : " + this.state.storeName);
  };

  _searchCancled = () => {
    this.setState({
      storeName: "",
      textSearched: false,
      textSearching: false
    });
    console.log("현재 storeName : " + this.state.storeName);
  };

  _searchStoreName = async () => {
    this.setState({
      textSearched: false,
      textSearching: true
    });

    try {
      let URL = linkdata.apiLink + "/restaurants/?input=" + this.state.storeName; //서버 주소
      console.log("통신 대상 URL : " + URL);
      console.log("통신 목적 : 검색어 전달 후 검색 결과 받기");
      console.log(
        "\n*************************서버 응답 대기중*************************\n"
      );

      let response = await fetch(URL, {
        method: "GET"
      });
      let rData = await response.json();
      if (rData && rData.restaurants) {
        console.log(
          "\n***********************서버로부터 응답 받음***********************\n"
        );
        console.log("데이터 확인!\n서버로부터 받은 데이터 : ");
        console.log(rData)
        console.log("데이터 끝\n");
        this.setState({
          textSearched: true,
          textSearching: false,
          restaurants: rData.restaurants
        });
        console.log(
          "restaurants에 저장하는 데이터 : ");
        console.log(this.state.restaurants);
        console.log("데이터 끝\n");
        console.log("textSearched  상태 : " + this.state.textSearched);
        console.log("textSearching 상태 : " + this.state.textSearching);
        return;
      } else {
        console.log(
          "\n***********************서버로부터 응답 실패***********************\n"
        );
        console.log(
          "\n***********************!!실패실패실패실패!!***********************\n"
        );

        this.setState({
          textSearched: false,
          textSearching: false
        });
        console.log("textSearched  상태 : " + this.state.textSearched);
        console.log("textSearching 상태 : " + this.state.textSearching);
      }
    } catch (error) {
      console.error(error);
    }
  };
}

_mapStoreSearch = async (event) => {

  console.log(event.nativeEvent.coordinate)

  try {
    let geoURL =
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=129.1133590,35.2982699&sourcecrs=epsg:4326&output=json&orders=legalcode";
    // "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc" +
    // "?coords=128.12345,37.98775" +
    // "&sourcecrs=epsg:3857" +
    // "&targetcrs=epsg:3857" +
    // "&orders=legalcode" +
    // "&ouput=json"; 이거 지금 안됨...

    console.log("통신 대상 URL : " + geoURL);
    console.log("통신 목적 : 리버스 지오 코딩 주소 반환");
    console.log(
      "\n*************************서버 응답 대기중*************************\n"
    );

    let response = await fetch(geoURL, {
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY": "81vlHVxNFH0NjkKz10aKLOdVA0lBtwy8m7NnNjZh",
        "X-NCP-APIGW-API-KEY-ID": "cjstpq2aer"
      }
    });
    let gData = await response.json();
    if (gData) {
      console.log(
        "\n***********************서버로부터 응답 받음***********************\n"
      );
      console.log("데이터 확인!\n서버로부터 받은 데이터 : ");
      console.log(gData);
      console.log("데이터 끝\n");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

class StoreStatus extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.isWritten ? styles.inabledStatus : styles.disabledStatus
        }
      >
        {this.props.storeType.map(storeType => (
          <Text key={storeType.toString()}>{storeType}</Text>
        ))}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  mapHighConatiner: {
    flex: 0.9
  },
  searchBarContainer: {
    position: "relative",
    flex: 0.1,
    minHeight: 60,
    maxHeight: 60,
    borderTopColor: "rgba(209,209,214,1)",
    borderStyle: "solid",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(209,209,214,1)",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(209,209,214,1)",
    borderLeftWidth: 0.5,
    borderLeftColor: "rgba(209,209,214,1)",
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    alignItems: "center",
    backgroundColor: "white"
  },
  searchBarTextInput: {
    position: "absolute",
    width: 300,
    bottom: 16,
    left: 24,
    fontSize: 16,
    color: "rgba(96,100,109, 1)",
    textAlign: "left"
  },
  searchBarButton: {
    position: "absolute",
    bottom: 18,
    right: 24,
    height: 20,
    width: 20
  },
  textSearchedContainer: {},
  ListItem: {
    height: 75
  },
  inabledStatus: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0faff",
    color: "rgba(255, 255, 255, 0)",
    flexDirection: "row"
  },
  disabledStatus: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f6f6fa",
    color: "rgba(4, 4, 15, 0.45)",
    flexDirection: "row"
  }
});
