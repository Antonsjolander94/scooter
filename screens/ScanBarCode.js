import React, { Component } from "react";
import {
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

class ScanBarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: Camera.Constants.FlashMode.off,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      flash: false,
      scannedQrCode: false
    };
  }
  scanQrAgain() {
    this.setState({ scannedQrCode: false });
  }
  async scanBarCode(obj) {
    if (obj) {
      console.log({ qrCode: obj });
      this.setState({ scannedQrCode: true });
      Alert.alert(
        obj.type,
        obj.data,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }
  async lightToggle() {
    this.setState({ flash: !this.state.flash });
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    const { hasCameraPermission, scannedQrCode } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            onCameraReady={() => {
              this.setState({
                flashMode: Camera.Constants.FlashMode.off
              });
            }}
            onBarCodeScanned={qrCode => {
              if (!scannedQrCode) {
                this.scanBarCode(qrCode);
              } else {
                console.log("Already Scanned!");
              }
            }}
            flashMode={
              this.state.flash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay} />

              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAndRightOverlay} />
                <View style={styles.rectangle} />

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay}>
                {scannedQrCode == true && (
                  <TouchableHighlight
                    onPress={() => this.scanQrAgain()}
                    style={styles.flashlightButton}
                  >
                    <Text>Skanna igen</Text>
                  </TouchableHighlight>
                )}

                <TouchableHighlight
                  style={styles.flashlightButton}
                  onPress={() => this.lightToggle()}
                >
                  <Ionicons
                    name="md-flashlight"
                    size={32}
                    color={this.state.flash ? "green" : "black"}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const overlayColor = "rgba(0,0,0,0.5)";

const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = "white";

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = "white";
const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  flashlightButton: {
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
  qrOverlayScanArea: {},
  qrOverlayScanActions: {
    display: "flex",
    flexDirection: "row"
  }
});

export default ScanBarCode;
