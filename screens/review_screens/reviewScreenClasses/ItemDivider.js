import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class ItemDivider extends React.Component {

  static defaultProps = {
    text : ""
  };

    constructor(props){
        super(props)
        
    }

  render() {
    const {text} = this.props;
    return (
      <View style={text ? itemDividerStyles.itemDividerWithText : itemDividerStyles.itemDivider}>
        {text ? <Text style={itemDividerStyles.itemDividerText}>{text}</Text> : <View />}
      </View>
    );
  }
}

const itemDividerStyles = StyleSheet.create({
  itemDivider: {
    height: 25,
    backgroundColor: "#f9f9fb"
  },
  itemDividerWithText: {
    height: 50,
    backgroundColor: "#f9f9fb",
    paddingTop: 5
  },
  itemDividerText: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8e8e93"
  }
});
