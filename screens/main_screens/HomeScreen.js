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
  Icon
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

import { MapView, Marker } from "expo";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      searched: false,
      searching: false,
      storeList: [],
      region: {
        latitude: 35.227703,
        longitude: 126.839799,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  static navigationOptions = {
    header: null
  };

  // getInitialState() {
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
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={this.state.searched ? {flex:0.4, maxHeight: 281} : styles.mapHighConatiner}>
          <MapView
            style={styles.mapcontainer}
            initialRegion={this.state.region}
            onRegionChange={this._onRegionChange}
          >
            {this.state.searched
              ? this.state.storeList.map(storeList =>
                  <MapView.Marker
                    key={storeList.id}
                    coordinate={storeList.marker.LatLng}
                    title={storeList.title}
                    description={storeList.marker.description}
                  />
                )
              : <View />}
          </MapView>
        </ScrollView>
        <View style={styles.searchBarContainer}>
          <TextInput
            value={this.state.storeName}
            style={styles.searchBarTextInput}
            placeholder="펭귄리포트"
            returnKeyType={"done"}
            autoCorrect={false}
            onChangeText={this._searchTextChange}
            onSubmitEditing={this._searchStoreName}
          />
          {this.state.searched
            ? <Button
                style={styles.searchBarButton}
                onPressOut={this._searchCancled}
              />
            : <View />}
        </View>
        {this.state.searched //서치 후 나타나는 창
          ? <ScrollView style={{ flex : 0.4, maxHeight: 282 }}>
              <List style={styles.searchedContainer}>
                {this.state.storeList.map(store =>
                  <ListItem
                    key={store.id}
                    style={styles.ListItem}
                    onPress={() => this.props.navigation.push("Store")}
                  >
                    <Left>
                      <View>
                        <Text>
                        {store.id}.{store.title}
                        </Text>
                        <Text>
                          {store.location}
                        </Text>
                      </View>
                    </Left>
                    <Right>
                      <View>
                        <StoreStatus isWritten={store.status.isWritten} storeType={store.status.storeType}></StoreStatus>
                      </View>
                    </Right>
                  </ListItem>
                )}
              </List>
            </ScrollView>
          : this.state.searching
            ? <View style={{ height: 50 }}>
                <ActivityIndicator />
              </View>
            : <View style={{ height: 0 }}/>}
      </KeyboardAvoidingView>
    );
  }

  //function start----------------------------  ------------------------------------------------------------------------------------------------------------------------

  _searchTextChange = text => {
    // 텍스트 변경 될 시 state인 storeName 현재 값인 text를 넣는다.
    this.setState({
      storeName: text
    });

    console.log(this.state.storeName);
  };

  _searchCancled = () => {
    // 텍스트 인풋을 벗어난 클릭 시 state인 storeName을 초기화 시킨다.
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

    try {
      let response = await fetch(
        "https://next.json-generator.com/api/json/get/N1QU9c8d8"
      );
      let rData = await response.json();
      this.setState({
        storeList: rData.storeList,
        searched: true,
        searching: false
      });
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const URL = ""; //서버 주소
    //   console.log(URL);

    //   console.log("awaiting response...");
    //   axios
    //     .post(URL, { data: this.state.storeName })
    //     .then(rData => {
    //       console.log("received response...");

    //       console.log(JSON.stringify(rData.data));

    //       if (rData.data) {
    //         this.setState({
    //           searched: true,
    //           searching: false,
    //           rData: rData,
    //           markers: rData.marker
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
    // } catch (error) {}
  };
}


class StoreStatus extends React.Component{
  render() {
    return (
      <TouchableOpacity style={this.props.isWritten ? styles.inabledStatus : styles.disabledStatus}>
        {this.props.storeType.map(storeType => <Text key={storeType.toString()}>{storeType}</Text>)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent : "flex-start",
    alignItems : "stretch"
  },
  mapHighConatiner: {
    flex: 0.9
  },
  mapcontainer: {
    height: 600
  },
  searchBarContainer: {
    position: "relative",
    // flex: 0.1,
    minHeight : 60,
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
  inabledStatus:{
    width : 60,
    height : 30,
    borderRadius : 15,
    backgroundColor : "#f0faff",
    color : "rgba(255, 255, 255, 0)",
    flexDirection: "row",
  },
  disabledStatus:{
    width : 60,
    height : 30,
    borderRadius : 15,
    backgroundColor : "#f6f6fa",
    color : "rgba(4, 4, 15, 0.45)",
    flexDirection: "row",
  },
});
