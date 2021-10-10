import React, { Component, useContext } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Head from "./Header";
import { AuthContext } from "./Home";

function DocInfo({ navigation, route }) {
  const userId = useContext(AuthContext);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ marginTop: 20, height: 135, width: 135, borderRadius: 70 }}
        source={{ uri: route.params.image }}
      ></Image>

      <Text
        style={{
          marginTop: 20,
          fontSize: 23,
          color: "rgb(34, 47, 45)",
          letterSpacing: 0.2,
        }}
      >
        {route.params.name}
      </Text>

      <Text
        style={{ marginTop: 20, color: "rgb(34, 47, 45)", letterSpacing: 0.2 }}
      >
        Matching agent
      </Text>

      <Text style={{ marginTop: 50, fontSize: 15, textAlign: "center" }}>
        {route.params.about}
      </Text>
    </View>
  );
}

export default DocInfo;
