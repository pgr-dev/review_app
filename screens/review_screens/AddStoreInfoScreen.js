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
  Body,
  Right,
  Button,
  Icon
} from "native-base";

class LogoTitle extends React.Component {
  render() {
    return (
      <View>
        <Text>lol</Text>
      </View>
    );
  }
}

export default class ReviewInfoScreen extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Container>
          {/* <Header style={styles.header}>
            <Left />
            <Text>음식점 등록</Text>
            <View />
          </Header> */}
          <Content>
            <List>
              <ListItem itemDivider style={{ height: 50 }}>
                <Text style={styles.itemDivider}>간판 사진</Text>
              </ListItem>
              <ListItem style={{ height: 293 }}>
                <TouchableOpacity>
                  <View />
                </TouchableOpacity>
              </ListItem>
              <ListItem
                itemDivider
                style={{ height: 75, flexDirection: "column" }}
              >
                <Text style={styles.itemDivider}>
                  간판의 내용이 모두 보이도록 사진을 찍어 주세요.
                </Text>
                <Text style={styles.itemDivider}>주소</Text>
              </ListItem>
              <ListItem>
                <TextInput placeholder="적어" />
              </ListItem>
              <ListItem>
                <TextInput placeholder="층" />
              </ListItem>
              <ListItem itemDivider />
              <ListItem>
                <TextInput placeholder="음식점 이름" />
              </ListItem>
              <ListItem>
                <TextInput placeholder="지점 이름" />
              </ListItem>
              <ListItem itemDivider />
              <ListItem>
                <Text>리뷰 유형</Text>
                <View>
                  <TouchableOpacity />
                  <TouchableOpacity />
                  <TouchableOpacity />
                </View>
              </ListItem>
            </List>
          </Content>
        </Container>
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Review")}
            style={styles.registerButton}
          >
            <Text style={{ color: "white", textAlign: "center" }}>음식점 등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#d1d1d6"
  },
  header: {
    backgroundColor: "white",
    height: 64,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  itemDivider: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8e8e93"
  },
  registerButtonContainer: {
    width: "100%",
    paddingRight: 8,
    paddingLeft: 8,
    position: "absolute",
    bottom: 0,
    height: 60,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#d1d1d6",
    justifyContent: "center",
    alignItems: "stretch"
  },
  registerButton: {
    backgroundColor: "#c7c7cc",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  }
});
