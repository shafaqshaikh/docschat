import React, { useState, useEffect } from "react";
import { Header } from "react-native-elements";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Cards";
import Services from "./Services";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel from "./Carousel";
import ConsultationList from "./ConsultationList";

const HomeScreen = ({ navigation }) => {
  const [user, seUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("number").then((result) => {
      setUser(result);
    });
  }, []);

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
    <View style={{ backgroundColor: "none", marginTop: 100 }}>
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
      {user !== null && (
        <ConsultationList ganda={navigation}></ConsultationList>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
