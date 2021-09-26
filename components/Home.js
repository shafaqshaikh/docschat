import React, { createContext, useState } from "react";
import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";
import Appointments from "./Appointments";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import Consultations from "./Consultations";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import Card from "./Cards";
import Services from "./Services";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { checkIfLoggedIn } from "../helpers/userHelper";
import UserInfo from "./userInfo";
import MentalHealth from "./MentalHealth";
import { ChatRoom } from "./ChatRoom";
import { AddRoomScreen } from "./AddRoom";
import { Image } from "react-native";
import TherapyPlan from "./TherapyPlan";
import TherapyPlanDetails from "./TherapyPlanDetails";
import TherapyPlanCheckout from "./TherapyPlanCheckout";
import BookSession from "./BookSession";
import TimeSlot from "./TimeSlot";
import DocInfo from "./DocInfo";

const Linking = {
  config: {
    Appointments: "feed",
  },
};

export const AuthContext = createContext(null);

export default function Home() {
  const [user, setUser] = useState(null);

  const Draw = createDrawerNavigator();
  const Stack = createStackNavigator();

  firebase.auth().onAuthStateChanged(async (result) => {
    if (result) {
      try {
        setUser(result);
      } catch (error) {}
    } else {
      console.log("user");
    }
  });

  function TabBScreen() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Patient Details"
          component={UserInfo}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Consult A Doctor");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Consult A Doctor"
          component={MentalHealth}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Dr. Basith"
          component={ChatRoom}
          options={({ navigation, route }) => ({
            headerTitle: (
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  style={{
                    borderRadius: 66,
                    height: 45,
                    width: 44,
                    marginRight: 13,
                    marginTop: 4,
                  }}
                  source={require("../assets/user.png")}
                ></Image>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book Session", {
                    docID: route.params.docID,
                    name: route.params.name,
                  });
                }}
              >
                <Image
                  style={{ height: 22, width: 33, marginRight: 13 }}
                  source={require("../assets/video-camera.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Book Session"
          component={BookSession}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dr. Basith");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
            // headerTitle: () => ('')
          })}
        />

        <Stack.Screen
          name="Time Slot"
          component={TimeSlot}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book Session");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
            // headerTitle: () => ('')
          })}
        />

        <Stack.Screen
          name="Profile"
          component={DocInfo}
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dr. Basith");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen
          name="Therapy Plan"
          component={Modal}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function Modal() {
    return (
      <Stack.Navigator
        mode="modal"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Therapy Plan"
          component={TherapyPlan}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dr. Basith");
                }}
              >
                <Image
                  style={{ height: 23, width: 24, marginRight: 25 }}
                  source={require("../assets/close.png")}
                ></Image>
              </TouchableOpacity>
            ),
            headerTitle: () => "",
            headerLeft: () => "",
          })}
        />

        <Stack.Screen
          name="Therapy Plan Details"
          component={TherapyPlanDetails}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dr. Basith");
                }}
              >
                <Image
                  style={{ height: 23, width: 24, marginRight: 25 }}
                  source={require("../assets/close.png")}
                ></Image>
              </TouchableOpacity>
            ),
            headerTitle: () => "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Therapy Plan");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Therapy Plan Checkout"
          component={TherapyPlanCheckout}
          options={({ navigation, route }) => ({
            // headerTitle: props => <LogoTitle {...props} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Therapy Plan Details");
                }}
              >
                <Image
                  style={{ height: 16, width: 21, marginLeft: 18 }}
                  source={require("../assets/back.png")}
                ></Image>
              </TouchableOpacity>
            ),
            headerTitle: () => "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dr. Basith");
                }}
              >
                <Image
                  style={{ height: 23, width: 24, marginRight: 25 }}
                  source={require("../assets/close.png")}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    );
  }

  return (
    <AuthContext.Provider value={user}>
      <NavigationContainer linking>
        <Draw.Navigator>
          <Draw.Screen name="Notifications" component={TabBScreen} />
          <Draw.Screen name="Consultations" component={Consultations} />
          <Draw.Screen name="Appointments" component={BookSession} />
        </Draw.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: "transparent",
    display: "flex",
    //backgroundImage: "none",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    paddingLeft: 12,
    marginBottom: 20,
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: "#14bef0",
    color: "#14bef0",
    borderWidth: 1,
    //fontFamily: 'Nunito',
    fontSize: 13,
  },
});
