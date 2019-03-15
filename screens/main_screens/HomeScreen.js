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
  Right
} from "native-base";

import { MapView, Marker } from "react-native-maps";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      searched: false,
      // searching: false,
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
        {/* <MapView
          style={styles.mapcontainer}
          initialRegion={{
            latitude: 35.227703,
            longitude: 126.839799,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        /> */}
          {/* {this.state.searched ? (
              this.state.storeList.map(storeList => (
                <Marker
                  coordinate={storeList.marker.LatLng}
                  title={storeList.title}
                  description={storeList.marker.description}
                />
              ))
            ) : (
              <View />
            )} */}

        <ScrollView style={styles.mapHighConatiner} />

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBarTextInput}
            placeholder="펭귄리포트"
            returnKeyType={"done"}
            autoCorrect={false}
            onChangeText={this._searchTextChange}
            onBlur={this._searchCancled}
            onSubmitEditing={this._searchStoreName}
          />
        </View>
        {this.state.searched ? ( //서치 후 나타나는 창
          <View>
            <List>
              {this.state.storeList.map(store => (
                <ListItem key={store.id}>
                <TouchableOpacity>
                  <Left>
                    <View>
                      <Text>{store.title}</Text>
                      <Text>{store.location}</Text>
                    </View>
                  </Left>
                  </TouchableOpacity>
                </ListItem>
              ))}
            </List>
          </View>
        ) : (
          <View />
        )}
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

  __searchCancled = () => {
    // 텍스트 인풋을 벗어난 클릭 시 state인 storeName을 초기화 시킨다.
    this.setState({
      storeName: ""
    });
    console.log(this.state.storeName);
  };

  _searchStoreName = async () => {
    this.setState({
      searched: false
    });
    //서버와의 연동

    try {
      let response = await fetch(
        "http://www.json-generator.com/api/json/get/cfbfyscnYi?indent=2"
      );
      let rData = await response.json();
      this.setState({
        storeList: rData.storelist,
        searched: true
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
  }
});
