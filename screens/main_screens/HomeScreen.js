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
  KeyboardAvoidingView
} from "react-native";
import MapView from "react-native-maps";

export default class HomeScreen extends React.Component {
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
          <TextInput style={styles.searchBarTextInput} placeholder="펭귄리포트" />
        </View>
      </KeyboardAvoidingView>
    );
  }

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
    height:60,
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
