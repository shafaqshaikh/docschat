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
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#89b8d4",
            borderRadius: 10,
            marginTop: 10,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          <View
            style={{
              flex: 1.5,
              flexDirection: "column",
              paddingLeft: 12,
              margin: "auto",
            }}
          >
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.hello}>Say Hello Dcotor.</Text>
            </View>

            <View style={{ paddingBottom: 15 }}>
              <Text style={styles.best}>24/7 Video Consultations.</Text>
            </View>

            <View>
              <Text style={styles.just}>Expert Help On Covid-19</Text>
            </View>
          </View>

          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
          >
            <Image
              resizeMode="cover"
              style={{
                height: "auto",
                width: "auto",
                padding: 63,
                borderBottomRightRadius: 10,
              }}
              source={require("../assets/doc.png")}
            ></Image>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hello: {
    //fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "white",
  },
  best: {
    //fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "white",
  },
  just: {
    backgroundColor: "white",
    borderRadius: 10,
    //height: 'fit-content',
    padding: 5,
    //fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
    color: "#5861a4",
    letterSpacing: 0.3,
    paddingLeft: 10,
    paddingRight: 10,
    //width: 'fit-content'
  },
});

export default Card;
