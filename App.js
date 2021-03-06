import React from "react";
import Home from "./components/Home";
import { LogBox, SafeAreaView } from "react-native";

// import LoadingScreen from './components/LoadingScreen'

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppRegistry } from "react-native";
//import { useFonts } from 'expo-font';

// import * as firebase from 'firebase';
// import { firebaseConfig } from './config';
// import LoginScreen from './components/LoginScreen';
// firebase.initializeApp(firebaseConfig);

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  // let [fontsLoaded] = useFonts({
  //   'Nunito': require('./assets/fonts/Nunito-Bold.ttf'),
  //   'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
  //   'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
  //   'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
  //   'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
  //   'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
  //   'Nunito-LightItalic': require('./assets/fonts/Nunito-LightItalic.ttf')
  // });

  return (
    <SafeAreaView style={{ flex: 1, height: "100%", width: "100%" }}>
      <Home />
    </SafeAreaView>
  );
}

// const AppSwitchNavigator = createSwitchNavigator({
//   // LoadingScreen: LoadingScreen,
//   // LoginScreen: LoginScreen,
//   HomeScreen: Home
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);

AppRegistry.registerComponent("medicAids", () => App);
