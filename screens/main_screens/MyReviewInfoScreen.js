import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
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
      
    };
  }

  componentDidMount = async () => {
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
  }


  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>

          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
