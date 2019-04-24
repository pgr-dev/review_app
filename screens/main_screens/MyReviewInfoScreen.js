import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
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

export default class MyReviewInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedReviewList: false,
      myReviewList: []
    };
  }

  componentDidMount() {
    this._retrieveMyReviewData();
    this._saveMyReviewData();
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            {this.state.loadedReviewList ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : (
              this.state.myReviewList.map(reviews => (
                <ListItem key={reviews.id} onPress={alert}>
                  <Left>
                    <View>
                      <Text>{reviews.date.month}월</Text>
                      <Text>{reviews.date.year}년</Text>
                      <Text>{reviews.state}상태</Text>
                      <Text>{reviews.name}이름</Text>
                    </View>
                  </Left>
                </ListItem>
              ))
            )}
          </List>
        </Content>
      </Container>
    );
  }

  _retrieveMyReviewData = async () => {
    this.setState({
      loadedReviewList: true
    });
    // const StoragedMyReviewData = await AsyncStorage.getItem("StoragedMyReviewData");
    // if (StoragedMyReviewData !== null){
    //   const ParsedStoragedMyReviewData = Json.parse(StoragedMyReviewData)
    //   this.setState({myReviewList: ParsedStoragedMyReviewData})
    // }
    try {
      let response2 = await fetch(
        "http://www.json-generator.com/api/json/get/cfllbKUKYy?indent=2"
      );
      let myreviewjson = await response2.json();
      this.setState({
        myReviewList: myreviewjson.myreview,
        loadedReviewList: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  _saveMyReviewData = myReviewList => {
    const savemyReviewList = AsyncStorage.setItem(
      "StoragedMyReviewData",
      JSON.stringify(myReviewList)
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
