// import * as Constants from 'expo-constants';
// import { AppAuth, GoogleSignIn } from 'expo';
// import React from 'react';
// import { Image, StyleSheet, Text, View, Platform } from 'react-native';

// import GoogleSignInButton from './GoogleSignInButton';

// const { OAuthRedirect, URLSchemes } = AppAuth;

// const isInClient = Constants.appOwnership === 'expo';
// if (isInClient) {
//   GoogleSignIn.allowInClient();
// }

// const clientIdForUseInTheExpoClient =
//   '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com';

// /*
//  * Redefine this one with your client ID
//  *
//  * The iOS value is the one that really matters,
//  * on Android this does nothing because the client ID
//  * is read from the google-services.json.
//  */
// const yourClientIdForUseInStandalone = Platform.select({
//   android:
//     '542840505079-ib372fln2nchfs54spptgtriqcn6vki2.apps.googleusercontent.com',
//   ios:
//     '542840505079-3637lts4m6pjovuptfcjso9urhvk2rfv.apps.googleusercontent.com',
// });

// const clientId = isInClient
//   ? clientIdForUseInTheExpoClient
//   : yourClientIdForUseInStandalone;

// export default class LoginScreen extends React.Component {
//   state = { user: null };

//   async componentDidMount() {
//     try {
//       await GoogleSignIn.initAsync({
//         isOfflineEnabled: true,
//         isPromptEnabled: true,
//         clientId,
//       });
//       this._syncUserWithStateAsync();
//     } catch ({ message }) {
//       alert('GoogleSignIn.initAsync(): ' + message);
//     }
//   }

//   _syncUserWithStateAsync = async () => {
//     const user = await GoogleSignIn.signInSilentlyAsync();
//     console.log('_syncUserWithStateAsync', { user });
//     this.setState({ user });
//   };

//   signOutAsync = async () => {
//     try {
//       await GoogleSignIn.signOutAsync();
//       this.setState({ user: null });
//     } catch ({ message }) {
//       alert('signOutAsync: ' + message);
//     }
//   };

//   signInAsync = async () => {
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === 'success') {
//         this._syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       alert('login: Error:' + message);
//     }
//   };

//   _syncUserWithStateAsync = async () => {
//     /*
//       const user = await GoogleSignIn.signInSilentlyAsync();
//       this.setState({ user });
//     */

//     const data = await GoogleSignIn.signInSilentlyAsync();
//     console.log({ data });
//     if (data) {
//       const photoURL = await GoogleSignIn.getPhotoAsync(256);
//       const user = await GoogleSignIn.getCurrentUserAsync();
//       this.setState({
//         user: {
//           ...user.toJSON(),
//           photoURL: photoURL || user.photoURL,
//         },
//       });
//     } else {
//       this.setState({ user: null });
//     }
//   };

//   get buttonTitle() {
//     return this.state.user ? 'Sign-Out of Google' : 'Sign-In with Google';
//   }

//   render() {
//     const scheme = {
//       OAuthRedirect,
//       URLSchemes,
//     };
//     const { user } = this.state;
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {user && <GoogleProfile {...user} />}
//         <GoogleSignInButton onPress={this._toggleAuth}>
//           {this.buttonTitle}
//         </GoogleSignInButton>
//         <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
//       </View>
//     );
//   }

//   _toggleAuth = () => {
//     console.log('Toggle', !!this.state.user);
//     if (this.state.user) {
//       this._signOutAsync();
//     } else {
//       this._signInAsync();
//     }
//   };

//   _signOutAsync = async () => {
//     try {
//       // await GoogleSignIn.disconnectAsync();
//       await GoogleSignIn.signOutAsync();
//       console.log('Log out successful');
//     } catch ({ message }) {
//       console.error('Demo: Error: logout: ' + message);
//     } finally {
//       this.setState({ user: null });
//     }
//   };

//   _signInAsync = async () => {
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       console.log({ type, user });
//       if (type === 'success') {
//         this._syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       console.error('login: Error:' + message);
//     }
//   };
// }

// class GoogleProfile extends React.PureComponent {
//   render() {
//     const { photoURL, displayName, email } = this.props;
//     return (
//       <View style={styles.container}>
//         {photoURL && (
//           <Image
//             source={{
//               uri: photoURL,
//             }}
//             style={styles.image}
//           />
//         )}
//         <View style={{ marginLeft: 12 }}>
//           <Text style={styles.text}>{displayName}</Text>
//           <Text style={styles.text}>{email}</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   image: { width: 128, borderRadius: 64, aspectRatio: 1 },
//   text: { color: 'black', fontSize: 16, fontWeight: '600' },
// });









// import React from "react";
// import { StyleSheet, Text, View, Image, Button, AsyncStorage } from "react-native";
// import * as Expo from "expo";

// const clientId = "121720734218-gm91lc6dtim5g3n2k5iscr1guasvmcrl.apps.googleusercontent.com"

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       signedIn: false,
//       name: "",
//       photoUrl: ""
//     };
//   }

//   signIn = async () => {
//     try {
//       const result = await Expo.Google.logInAsync({
//         clientId: clientId,
//         scopes: ["profile", "email"]
//       });

//       if (result.type === "success") {
//         console.log(result.accessToken);
//         console.log(result.idToken);
//         console.log(result.user);
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: result.user.photoUrl
//         });
//       } else {
//         console.log("cancelled");
//       }
//     } catch (e) {
//       console.log("error", e);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.signedIn ? (
//           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//         ) : (
//           //   this.props.navigation.navigate("Main")
//           <LoginPage signIn={this.signIn} />
//         )}
//       </View>
//     );
//   }
// }

// const LoginPage = props => {
//   return (
//     <View>
//       <Text style={styles.header}>Sign In With Google</Text>
//       <Button title="Sign in with Google" onPress={() => props.signIn()} />
//     </View>
//   );
// };

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   header: {
//     fontSize: 25
//   },
//   image: {
//     marginTop: 15,
//     width: 150,
//     height: 150,
//     borderColor: "rgba(0,0,0,0.2)",
//     borderWidth: 3,
//     borderRadius: 150
//   }
// });








// import React, { Component } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import firebase from "firebase";
// class LoginScreen extends Component {
  
//   isUserEqual = (googleUser, firebaseUser) => {
//     if (firebaseUser) {
//       var providerData = firebaseUser.providerData;
//       for (var i = 0; i < providerData.length; i++) {
//         if (
//           providerData[i].providerId ===
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//           providerData[i].uid === googleUser.getBasicProfile().getId()
//         ) {
//           // We don't need to reauth the Firebase connection.
//           return true;
//         }
//       }
//     }
//     return false;
//   };

//   onSignIn = googleUser => {
//     console.log("Google Auth Response", googleUser);
//     // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//     var unsubscribe = firebase.auth().onAuthStateChanged(
//       function(firebaseUser) {
//         unsubscribe();
//         // Check if we are already signed-in Firebase with the correct user.
//         if (!this.isUserEqual(googleUser, firebaseUser)) {
//           // Build Firebase credential with the Google ID token.
//           var credential = firebase.auth.GoogleAuthProvider.credential(
//             googleUser.idToken,
//             googleUser.accessToken
//           );
//           // Sign in with credential from the Google user.
//           firebase
//             .auth()
//             .signInAndRetrieveDataWithCredential(credential)
//             .then(function(result) {
//               console.log("user signed in ");
//               if (result.additionalUserInfo.isNewUser) {
//                 firebase
//                   .database()
//                   .ref("/users/" + result.user.uid)
//                   .set({
//                     gmail: result.user.email,
//                     profile_picture: result.additionalUserInfo.profile.picture,
//                     first_name: result.additionalUserInfo.profile.given_name,
//                     last_name: result.additionalUserInfo.profile.family_name,
//                     created_at: Date.now()
//                   })
//                   .then(function(snapshot) {
//                     // console.log('Snapshot', snapshot);
//                   });
//               } else {
//                 firebase
//                   .database()
//                   .ref("/users/" + result.user.uid)
//                   .update({
//                     last_logged_in: Date.now()
//                   });
//               }
//             })
//             .catch(function(error) {
//               // Handle Errors here.
//               var errorCode = error.code;
//               var errorMessage = error.message;
//               // The email of the user's account used.
//               var email = error.email;
//               // The firebase.auth.AuthCredential type that was used.
//               var credential = error.credential;
//               // ...
//             });
//         } else {
//           console.log("User already signed-in Firebase.");
//         }
//       }.bind(this)
//     );
//   };

//   signInWithGoogleAsync = async () => {
//     try {
//       const result = await Expo.Google.logInAsync({
//         // androidClientId: YOUR_CLIENT_ID_HERE,
//         clientId:
//           "542840505079-1b8gkt2mqqtmi66bbmgfs607jdomqhk8.apps.googleusercontent.com", //enter client id
//         scopes: ["profile", "email"]
//       });

//       if (result.type === "success") {
//         this.onSignIn(result);
//         return result.accessToken;
//       } else {
//         return { cancelled: true };
//       }
//     } catch (e) {
//       return { error: true };
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button
//           title="Sign In With Google"
//           onPress={() => this.signInWithGoogleAsync()}
//         />
//       </View>
//     );
//   }
// }
// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });