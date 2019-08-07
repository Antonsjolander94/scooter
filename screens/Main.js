import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from "expo-permissions";
import MapStyle from "../assets/mapStyle/MapStyle.json";
import MapButtons from "../components/MapButtons";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null
      },
      error: null
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status === "granted") {
      const reponse = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    const { latitude, longitude } = this.state.region;

    if (latitude) {
      return (
        <View style={styles.container}>
          <MapView
            customMapStyle={MapStyle}
            provider={PROVIDER_GOOGLE}
            style={styles.mapContainer}
            showsUserLocation={true}
            showsCompass={false}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
          <MapButtons />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Laddar</Text>
        </View>
      );
    }
  }
}

export default Main;
const colorGreen = "#51c569";
const colorDark = "#050505";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  }
});
