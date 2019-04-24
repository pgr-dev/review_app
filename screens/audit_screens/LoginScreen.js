import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as Expo from "expo";
import GoogleSignInButton from "./GoogleSignInButton";

const clientId =
  "542840505079-buui9r0lcgtj518il8h1b805ufkrdnoh.apps.googleusercontent.com";

const isAndroid = () => Platform.OS === "android";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signing: false,
      signedIn: false,
      name: "",
      photoUrl: "",
      id: ""
    };
  }

  signIn = async () => {
    this.setState({
      signing: true
    });
    try {
      const result = await Expo.Google.logInAsync({
        clientId: isAndroid()
          ? "542840505079-jksabdkce75e19umkf9vda66q30usns4.apps.googleusercontent.com"
          : "542840505079-n023atqdruis9v3mup72p7t0kkcoidpj.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log(result.accessToken);
        console.log("\n\n");
        console.log(result.idToken);
        console.log("\n\n");
        console.log(result.user);
        this.setState({
          id: result.user.id,
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          signing: true
        });
      } else {
        console.log("cancelled");
        this.setState({
          signing: false
        });
      }
    } catch (e) {
      console.log("error", e);
      this.setState({
        signing: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <View style={styles.container}>
            <Text style={styles.header}>Welcome:{this.state.name}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            >
              <Image
                style={styles.image}
                source={{ uri: this.state.photoUrl }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {this.state.signing ? (
              <ActivityIndicator />
            ) : (
              <GoogleSignInButton onPress={() => this.signIn()} style={{flex : 1}}/>
              
            )}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HomeScreen")} style={{flex : 1}}
            ></TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28b4f0"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 15
  }
});
