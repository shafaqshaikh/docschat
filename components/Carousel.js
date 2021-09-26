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

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;
const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;

class Carousel extends Component {
  render() {
    const { container } = styles;

    return (
      <ScrollView style={{ marginBottom: 33 }} horizontal>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.7,
            backgroundColor: "#c1a3d4",
            borderRadius: 10,
            marginTop: 10,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              paddingBottom: 0,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.hello}>Online Therapy</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <Text style={styles.best}>
                  Connect With Our Experts And Begin Your Journey Via Video Call
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                paddingLeft: 15,
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={styles.just}>RS 599/Session</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Image
                resizeMode="cover"
                style={{
                  height: "auto",
                  width: "auto",
                  paddingTop: 30,
                  paddingLeft: 36,
                  paddingBottom: 30,
                  paddingRight: 36,
                  borderRadius: 10,
                }}
                source={require("../assets/online.png")}
              ></Image>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.7,
            backgroundColor: "#f1ada2",
            borderRadius: 10,
            marginTop: 10,
            marginRight: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              paddingBottom: 0,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.hello}>Couples Therapy</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <Text style={styles.best}>
                  Resolve Conflicts In Relationships And Marriages
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                paddingLeft: 15,
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={styles.just}>RS 799/Session</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Image
                resizeMode="cover"
                style={{
                  height: "auto",
                  width: "auto",
                  paddingTop: 30,
                  paddingLeft: 40,
                  paddingBottom: 30,
                  paddingRight: 40,
                  borderRadius: 10,
                }}
                source={require("../assets/couples.png")}
              ></Image>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.7,
            backgroundColor: "#b6499c",
            borderRadius: 10,
            marginTop: 10,
            marginRight: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              paddingBottom: 0,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.hello}>Online Physio</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <Text style={styles.best}>
                  Connect With certified, Specialized And Experienced
                  Physiotherapists
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                paddingLeft: 15,
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={styles.just}>RS 399/Session</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Image
                resizeMode="cover"
                style={{
                  height: "auto",
                  width: "auto",
                  padding: 28,
                  borderRadius: 10,
                }}
                source={require("../assets/therapist.png")}
              ></Image>
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 12,
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

export default Carousel;
