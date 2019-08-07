import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class MapButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Skanna och glid</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const yellow = "#ffcd0e";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24
  },
  scanButton: {
    width: "100%",
    backgroundColor: yellow,
    padding: 18,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  scanButtonText: {
    color: "black",
    fontFamily: "montserrat-extra-bold",
    textTransform: "uppercase"
  }
});
