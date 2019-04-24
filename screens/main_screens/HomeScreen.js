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
      storeList: []
    };
  }

  static navigationOptions = {
    header: null
  };

  //render start--------------------------------------------------------------------------------------------

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={styles.mapHighConatiner}>
          <MapView
            style={styles.mapcontainer}
            initialRegion={{
              latitude: 35.227703,
              longitude: 126.839799,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {/* {this.state.searched
            ? this.state.storeList.map(storeList =>
                <Marker
                  coordinate={storeList.marker.LatLng}
                  title={storeList.title}
                  description={storeList.marker.description}
                />
              )
            : <View />} */}
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
          ? <ScrollView style={{ maxHeight: 350 }}>
              <List style={styles.searchedContainer}>
                {this.state.storeList.map(store =>
                  <ListItem
                    key={store.id}
                    style={styles.ListItem}
                    onPress={() => this.props.navigation.navigate("Store")}
                  >
                    <Left>
                      <View>
                        <Text>
                          {store.title}
                        </Text>
                        <Text>
                          {store.location}
                        </Text>
                      </View>
                    </Left>
                    <Right>
                      <View>
                        <Text>
                          {store.marker.description}
                        </Text>
                      </View>
                    </Right>
                  </ListItem>
                )}
              </List>
            </ScrollView>
          : this.state.searching
            ? <View style={{ height: 30 }}>
                <ActivityIndicator />
              </View>
            : <View />}
      </KeyboardAvoidingView>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

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
      searched : false,
      searching : false
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  mapHighConatiner: {
    flex: 9
  },
  mapcontainer: {
    height: 600
  },
  searchBarContainer: {
    position: "relative",
    height: 60,
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
  }
});
