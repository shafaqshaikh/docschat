import React, { useState, useEffect } from "react";
import { Header } from "react-native-elements";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Card from "./Cards";
import Services from "./Services";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel from "./Carousel";
import ConsultationList from "./ConsultationList";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Platform } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("number").then((result) => {
      setUser(result);
      console.log("this is result", result);
    });
  }, [user]);
  console.log(user);
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
    setUser(null);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}>
      <View
        style={Platform.OS === "android" ? styles.menubar : styles.menubarIOS}>
        <TouchableOpacity>
          <FontAwesome5
            name={"bars"}
            style={{ fontSize: 26 }}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>

        <Image
          style={{ height: 40, width: 50, marginLeft: 14 }}
          source={require("../assets/logo_dc.png")}></Image>
      </View>
      {/* <Header
        placement="left"
        backgroundColor="none"
        leftComponent={
          <FontAwesome.Button
            title=""
            backgroundColor="none"
            onPress={() => navigation.openDrawer()}
          >
            <Entypo name="menu" size={24} color="black" />
          </FontAwesome.Button>
        }
        centerComponent={{
          text: "MedAids",
          style: { paddingTop: "4%", color: "black" },
        }}
        rightComponent={
          user !== null ? (
            <TouchableOpacity style={styles.login} onPress={logout}>
              Sign Out
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.login}
              onPress={() => navigation.navigate("Sign In")}
            >
              Sign In
            </TouchableOpacity>
          )
        }
      /> */}
      <Card></Card>
      <Services ganda={navigation}></Services>
      <Carousel></Carousel>
      <View style={{ marginTop: 20, paddingHorizontal: 14 }}>
        <Text
          style={{
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "600",
            color: "#363636",
            paddingBottom: 10,
          }}>
          Consultations
        </Text>
        {user !== null && (
          <ConsultationList ganda={navigation}></ConsultationList>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menubarIOS: {
    // marginTop: 40,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },

    elevation: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  menubar: {
    // marginTop: 40,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },

    elevation: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  login: {
    backgroundColor: "transparent",
    //display: 'block',
    //backgroundImage: 'none',
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
