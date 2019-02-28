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
  AsyncStorage
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
import MapView from "react-native-maps";

export default class HomeScreen extends React.Component {
  state = {
    storeName: "",
    searched: false,
    searching: false,
    storeList: []
  };

  static navigationOptions = {
    header: null
  };

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
            showsBuildings={true}
            loadingEnabled={true}
          />
        </ScrollView>
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
          {searched ? (
            <View>
              <List>
                {this.state.storeList.map(item => {
                  return (
                    <ListItem>
                      <Left>
                      <View>
                        <Text></Text>
                        <Text></Text>
                      </View>
                      </Left>
                      <Right>
                      <View>
                        <Icon></Icon>
                      </View>
                      </Right>
                    </ListItem>
                  );
                })}
              </List>
            </View>
          ) : (
            <View />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

  _searchTextChange = text => {
    // 텍스트 변경 될 시 state인 storeName 현재 값인 text를 넣는다.
    this.setState({
      storeName: text
    });
  };

  __searchCancled = () => {
    // 텍스트 인풋을 벗어난 클릭 시 state인 storeName을 초기화 시킨다.
    this.setState({
      storeName: "",
      searching : false
    });
  };

  _searchStoreName = async () => {
    this.setState({
      searching: true
    })
    try {
      const URL = ""; //서버 주소
      console.log(URL);
      const data = new FormData(); //보내는 데이터

      console.log("awaiting response...");
      axios
        .post(URL, { data: this.state.storeName })
        .then(rData => {
          console.log("received response...");

          console.log(JSON.stringify(rData.data));

          if (rData.data) {
            this.setState({
              searched: true,
              searching: false,
              rData: rData
            });
            return;
          } else {
            this.setState({
              searched: false,
              searching: false,
              error: rData.data.error
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {}
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
