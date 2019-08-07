import React from "react";
import { Text, View, StatusBar } from "react-native";
import Container from "./screens/ScreenContainer";
import * as Font from "expo-font";
import Map from "./screens/Map";
import Header from "./components/Header";
import RouteHandler from "./screens/ScreenContainer";

export default class App extends React.Component {
  state = {
    isReady: false
  };
  componentDidMount = async () => {
    await Font.loadAsync({
      "montserrat-extra-bold": require("./assets/fonts/Montserrat-ExtraBold.ttf")
    });
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <View>
          <Text>Laddar</Text>
        </View>
      );
    }
    return <RouteHandler />;
  }
}
