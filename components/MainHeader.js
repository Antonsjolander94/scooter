import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.block}>
            <Text>menu</Text>
          </View>
          <View style={styles.block2}>
            <Text>logo</Text>
          </View>
          <View style={styles.block3}>
            <Text>?</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default MainHeader;

const yellow = "#ffcd0e";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: yellow
  },
  headerLogo: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  headerContainer: {
    marginTop: 20,
    backgroundColor: yellow,
    padding: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  block: {
    display: "flex",
    alignItems: "flex-start",
    width: "33%"
  },
  block2: {
    display: "flex",
    alignItems: "center",
    width: "33%"
  },
  block3: {
    display: "flex",
    alignItems: "flex-end",
    width: "33%"
  }
});
