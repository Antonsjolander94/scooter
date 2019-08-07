import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Map from "../screens/Map";
import Main from "../screens/Main";
import About from "../screens/About";
import ScanBarCode from "../screens/ScanBarCode";
import Header from "../components/Header";
import MainHeader from "../components/MainHeader";
import HeaderBack from "../components/HeaderBack";

const NavigationStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: { header: <MainHeader /> }
  },
  Main2: {
    screen: Map,
    navigationOptions: { header: <Header /> }
  },
  About: {
    screen: About
  },
  ScanBarCode: {
    screen: ScanBarCode,
    navigationOptions: { header: <HeaderBack /> }
  }
});

const Container = createAppContainer(NavigationStack);

export default Container;
