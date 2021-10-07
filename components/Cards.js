import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const CARD_WIDTH = Dimensions.get("window").width * 0.8;
const CARD_HEIGHT = Dimensions.get("window").height * 0.3;
const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;

class Card extends Component {
  render() {
    const { container } = styles;

    return (
      <View style={{ padding: 10 }}>
        <View style={styles.containerbox}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignContent: "space-around",
              paddingLeft: 10,
            }}>
            <Text style={styles.hello}>Say Hello Dcotor.</Text>

            <Text style={styles.best}>24/7 Video Consultations.</Text>

            <Text style={styles.just}>Expert Help On Covid-19</Text>
          </View>

          <Image
            resizeMode="cover"
            style={{
              height: 120,
              width: 130,
              borderBottomRightRadius: 10,
            }}
            source={require("../assets/doc.png")}></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#89B8D4",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },

  hello: {
    //fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "#fff",
    fontWeight: "bold",
  },
  best: {
    //fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "#fff",
  },
  just: {
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    //height: 'fit-content',
    padding: 5,
    //fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: "#5861a4",
    letterSpacing: 0.3,
    paddingLeft: 10,
    paddingRight: 10,
    //width: 'fit-content'
  },
});

export default Card;
