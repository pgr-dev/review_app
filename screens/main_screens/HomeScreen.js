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
      searched: false,
      searching: false,
      restaurants: [],
      region: {
        latitude: 35.227703,
        longitude: 126.839799,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      superheight : 563
    };
  }


  componentDidMount = async () => {
    try {
      console.log("requesting started...");
      let geoURL =
        "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=129.1133590,35.2982699&sourcecrs=epsg:4326&output=json&orders=legalcode";
      // "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc" +
      // "?coords=128.12345,37.98775" +
      // "&sourcecrs=epsg:3857" +
      // "&targetcrs=epsg:3857" +
      // "&orders=legalcode" +
      // "&ouput=json"; 이거 지금 안됨...
      console.log(geoURL);
      console.log("awaiting response...");

      let response = await fetch(geoURL, {
        method: "GET",
        headers: {
          "X-NCP-APIGW-API-KEY": "81vlHVxNFH0NjkKz10aKLOdVA0lBtwy8m7NnNjZh",
          "X-NCP-APIGW-API-KEY-ID": "cjstpq2aer"
        }
      });
      let gData = await response.json();
      if (gData) {
        console.log("received response...");
        console.log(gData);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  static navigationOptions = {
    header: null
  };

  // getInitialState() { 이것도 지금 안됨
  //   return {
  //     region: {
  //       latitude: 35.227703,
  //       longitude: 126.839799,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421
  //     }
  //   };
  // }

  _onRegionChange = region => {
    this.setState({ region: region });
    // console.log(this.state.region)
  };

  //render start--------------------------------------------------------------------------------------------

  render() {
    const { storeName, searched, searching, restaurants, region } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView
            style={
              searched ? { flex: 0.4, maxHeight: 281 } : styles.mapHighConatiner
            }
            onLayout={event => {this.setState({
              superheight : event.nativeEvent.layout.height
            })}
            }
          >
            <MapView
              style={{
                height : this.state.superheight
              }}
              initialRegion={region}
              onRegionChange={this._onRegionChange}
            >
              {searched ? (
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
            {searched ? (
              <Button
                style={styles.searchBarButton}
                onPressOut={this._searchCancled}
              />
            ) : (
              <View style={{height : 0}}/>
            )}
          </View>
        </KeyboardAvoidingView>

        {searched ? ( //서치 후 나타나는 창
          <ScrollView style={{ flex: 0.4, maxHeight: 282 }}>
            <List style={styles.searchedContainer}>
              {restaurants.map(store => (
                <ListItem
                  key={store.order}
                  style={styles.ListItem}
                  onPress={() =>
                    this.props.navigation.push("Store", {
                      itemId: store.id
                    })
                  }
                >
                  <Left>
                    <View>
                      <Text>
                        {store.order}.{store.name}
                        {store.branch_name ? store.branch_name : ""}
                      </Text>
                      <Text>{store.address}</Text>
                    </View>
                  </Left>
                  <Right>
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
                  </Right>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        ) : searching ? (
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

  _searchTextChange = async(text) => {
    // 텍스트 변경 될 시 state인 storeName 현재 값인 text를 넣는다.
    await this.setState({
      storeName: text
    });

    console.log(this.state.storeName);
  };

  _searchCancled = () => {
    this.setState({
      storeName: "",
      searched: false,
      searching: false
    });
    console.log(this.state.storeName);
  };

  _searchStoreName = async () => {
    this.setState({
      searched: false,
      searching: true
    });

    //서버와의 연동

    // try {                    axios를 사용한 통신
    //   let URL =
    //     "https://yzygpacb33.execute-api.us-east-1.amazonaws.com/dev" +
    //     this.state.storeName; //서버 주소
    //   console.log(URL);
    //   console.log("awaiting response...");

    //   axios({
    //     method: "get",
    //     url: URL,
    //     timeout: 10000 // 10초 이내에 응답이 오지 않으면 에러로 간주
    //   })
    //     .then(rData => {
    //       console.log("received response...");
    //       console.log(JSON.stringify(rData));
    //       if (rData) {
    //         this.setState({
    //           searched: true,
    //           searching: false,
    //           restaurants: rData.restaurants
    //         });
    //         return;
    //       } else {
    //         this.setState({
    //           searched: false,
    //           searching: false
    //         });
    //       }
    //     })
    //     .catch(err => console.log(err));
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      let URL = linkdata.apiLink + "?input=" + this.state.storeName; //서버 주소
      console.log(URL);
      console.log("awaiting response...");

      let response = await fetch(URL, {
        method: "GET"
      });
      let rData = await response.json();
      if (rData) {
        console.log("received response...");
        console.log(rData);
        this.setState({
          searched: true,
          searching: false,
          restaurants: rData.restaurants
        });
        console.log(this.state.restaurants, this.state.searched);
        return;
      } else {
        this.setState({
          searched: false,
          searching: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

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
  searchedContainer: {},
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
