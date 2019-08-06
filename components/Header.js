import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pressing = () => {
    console.log("asd");
  };

  render() {
    return (
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.header}
      >
        <View style={styles.headerContainer}>
          <View>
            <TouchableHighlight
              onPress={this.pressing}
              style={styles.headerButton}
            >
              <Feather name="menu" size={24} color="#31465a" />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={this.pressing}
              style={styles.headerButton}
            >
              <Feather name="user" size={24} color="#31465a" />
            </TouchableHighlight>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    right: 0,
    display: "flex",
    flex: 1,
    left: 0,
    top: 0,
    backgroundColor: "transparent",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24
  },
  headerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    height: 60
  }
});
