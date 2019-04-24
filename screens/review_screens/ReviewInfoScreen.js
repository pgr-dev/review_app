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

export default class ReviewInfoScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Text>방문 날짜</Text>
              </Left>
              <Right>
                <TextInput />
              </Right>
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Text>작성 시간</Text>
              </Left>
              <Right>
                <Text>gg</Text>
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>작성 시간은 리뷰 최초 저장 시 기록됩니다.</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text>음식점</Text>
              </Left>
              <Right>
                <Text>펭귄리포트(1호점)</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>리뷰 유형</Text>
              </Left>
              <Right>
                <Text>식사</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>리뷰어</Text>
              </Left>
              <Right>
                <Text>젠투펭귄</Text>
              </Right>
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <View>
                <Left>
                  <Text>크기</Text>
                </Left>
                <View>
                  <Text>소</Text>

                  <Text>중</Text>

                  <Text>대</Text>

                  <Text>특대</Text>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Left>
                  <Text>복층</Text>
                </Left>
                <View>
                  <Text>N</Text>

                  <Text>Y</Text>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Left>
                  <Text>룸</Text>
                </Left>
                <View>
                  <Text>N</Text>

                  <Text>Y</Text>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Left>
                  <Text>셀프 서비스</Text>
                </Left>
                <View>
                  <Text>없음</Text>

                  <Text>결제</Text>

                  <Text>배식</Text>

                  <Text>퇴식</Text>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Left>
                  <Text>화장실</Text>
                </Left>
                <View>
                  <Text>없음</Text>

                  <Text>내부</Text>

                  <Text>외부</Text>
                </View>
              </View>
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Text>리뷰 삭제</Text>
              </Left>
            </ListItem>
            <ListItem itemDivider>
              <Text>승인되지 않은 리뷰만 삭제 가능합니다.</Text>
            </ListItem>
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
