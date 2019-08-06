import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Button,
  FlatList
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Animated,
  PROVIDER_GOOGLE
} from "react-native-maps";
import { Feather, Ionicons } from "@expo/vector-icons";
import ScooterWhite from "../assets/svg/scooter-black.svg";
import MapStyle from "../assets/mapStyle/MapStyle.json";
import * as Permissions from "expo-permissions";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

const { height, width } = Dimensions.get("screen");
const data = {
  startPrice: 10,
  minutePrice: 1,
  availableScooters: [
    {
      id: 1,
      title: "Leo",
      battery: 10,
      coordinate: {
        latitude: 63.8337736,
        longitude: 20.3328418
      }
    },
    {
      id: 2,
      title: "Alex",
      battery: 10,
      coordinate: {
        latitude: 63.8202865,
        longitude: 20.3072157
      }
    }
  ]
};

scanBarCode = () => {
  console.log("Scan Bar code");
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      latitude: null,
      longitude: null,
      location: null
    };
  }

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status === "granted") {
      const reponse = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }
  componentDidMount() {
    this.getLocationAsync();
  }

  renderScooter(item) {
    return (
      <TouchableWithoutFeedback
        key={`scooter-${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={styles.scooter}>
          <View style={styles.scooterInfo}>
            <Text style={styles.scooterTitle}>{item.title}</Text>

            <Text style={styles.scooterPrice}>
              {data.startPrice} SEK + {data.minutePrice} SEK/min
            </Text>
          </View>
          <View style={styles.scooterAction}>
            <TouchableOpacity style={styles.scooterButton}>
              <Feather name="unlock" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderScooters = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.scooters}
        data={data.availableScooters}
        renderItem={({ item }) => this.renderScooter(item)}
        keyExtractor={(item, index) => `${item.id}`}
      />
    );
  };

  render() {
    const { latitude, longitude } = this.state;

    if (latitude) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            showsCompass={false}
            customMapStyle={MapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {data.availableScooters.map((scooter, index) => (
              <Marker
                onPress={() => this.setState({ active: scooter.id })}
                key={`marker-${scooter.id}`}
                coordinate={{
                  latitude: scooter.coordinate.latitude,
                  longitude: scooter.coordinate.longitude
                }}
              >
                <View
                  style={[
                    styles.marker,
                    this.state.active === scooter.id ? styles.active : null
                  ]}
                >
                  <ScooterWhite width={24} height={24} />
                </View>
              </Marker>
            ))}
          </MapView>

          <View style={styles.scanButtonContainer}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("ScanBarCode")}
              style={styles.scanButton}
            >
              <View style={styles.scanButtonTextContainer}>
                <Ionicons name="md-qr-scanner" size={24} color="#31465a" />
                <Text style={styles.scanButtonText}>Skanna och kör</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Laddar...</Text>
        </View>
      );
    }
  }
}

Map.navigationOptions = {
  leftButtonText: "Meny",
  title: "Karta"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  map: {
    flex: 1
  },
  scooters: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 34
  },
  scooter: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 16,
    marginHorizontal: 24,
    width: width - 24 * 2
  },
  scooterTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    marginBottom: 3
  },
  scooterInfo: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  scooterAction: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  scooterPrice: {
    opacity: 0.85
  },
  scooterInfoRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  marker: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "#51c569",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  active: {
    borderWidth: 2,
    borderColor: "white",
    zIndex: 99
  },

  scanButtonContainer: {
    position: "absolute",
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    left: 0,
    bottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24
  },
  scanButtonTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  scanButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
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
  scanButtonText: {
    fontFamily: "MontserratExtraBold",
    color: "#31465a",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 16
  }
});
