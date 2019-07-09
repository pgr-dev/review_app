import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Container, Header, Content, Left, Right, Radio } from "native-base";
import { connect } from "react-redux";
import { actionCreators } from "../../reducer";
import produce from "immer";
import ItemDivider from "./reviewScreenClasses/ItemDivider";

class ReviewInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      review: {
        day: "1998"
      }
    };
  }

  _changeDay = async text => {
    const review = this.state;
    await this.setState(
      produce(review => {
        review.day = text;
      })
    );
    console.log(review.day);
    this.props.applySaveReview(review);
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <ItemDivider />
            <View>
              <Left>
                <Text>방문 날짜{this.state.review.day}</Text>
              </Left>
              <Right>
                <TextInput placeholder="방문날짜" onChangeText={this._changeDay} blurOnSubmit={false} />
              </Right>
            </View>
            <ItemDivider />
            <View>
              <Left>
                <Text>작성 시간</Text>
              </Left>
              <Right>
                <Text>gg</Text>
              </Right>
            </View>
            <ItemDivider text={"작성 시간은 리뷰 최초 저장 시 기록됩니다."} />

            <View>
              <Left>
                <Text>음식점</Text>
              </Left>
              <Right>
                <Text>펭귄리포트(1호점)</Text>
              </Right>
            </View>

            <View>
              <Left>
                <Text>리뷰 유형</Text>
              </Left>
              <Right>
                <Text>식사</Text>
              </Right>
            </View>

            <View>
              <Left>
                <Text>리뷰어</Text>
              </Left>
              <Right>
                <Text>젠투펭귄</Text>
              </Right>
            </View>

            <ItemDivider />

            <View />
            <View>
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
            </View>
            <View>
              <View>
                <Left>
                  <Text>복층</Text>
                </Left>
                <View>
                  <Text>N</Text>

                  <Text>Y</Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Left>
                  <Text>룸</Text>
                </Left>
                <View>
                  <Text>N</Text>

                  <Text>Y</Text>
                </View>
              </View>
            </View>
            <View>
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
            </View>
            <View>
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
            </View>

            <ItemDivider />

            <View>
              <Left>
                <Text>리뷰 삭제</Text>
              </Left>
            </View>
            <ItemDivider text={"승인되지 않은 리뷰만 삭제 가능합니다."} />
          </View>
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

function mapStateToProps(state) {
  return {
    review: state.review
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applySaveReview: review => {
      dispatch(actionCreators.saveReview(review));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewInfoScreen);
