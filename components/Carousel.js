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
      <ScrollView horizontal>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.8,
            backgroundColor: "#c1a3d4",
            borderRadius: 10,
            marginTop: 10,
            marginHorizontal: 12,
          }}>
          <View style={styles.colorfull_Cards}>
            <View>
              <Text style={styles.hello}>Online Therapy</Text>
            </View>

            <View>
              <Text style={styles.best}>
                Connect With Our Experts And Begin Your Journey Via Video Call
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 15,
              alignItems: "center",
            }}>
            <View>
              <Text style={styles.just}>RS 599/Session</Text>
            </View>
            <View>
              <Image
                resizeMode="cover"
                style={{
                  height: 70,
                  width: 80,
                  flex: 1,
                  alignSelf: "flex-end",
                }}
                source={require("../assets/online.png")}></Image>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.8,
            backgroundColor: "#f1ada2",
            borderRadius: 10,
            marginTop: 10,
            marginRight: 12,
          }}>
          <View style={styles.colorfull_Cards}>
            <View>
              <Text style={styles.hello}>Couples Therapy</Text>
            </View>

            <View>
              <Text style={styles.best}>
                Resolve Conflicts In Relationships And Marriages
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 15,
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.just}>RS 799/Session</Text>
              </View>
              <View>
                <Image
                  resizeMode="cover"
                  style={{
                    height: 70,
                    width: 80,
                    flex: 1,
                    alignSelf: "flex-end",
                  }}
                  source={require("../assets/couples.png")}></Image>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: CARD_WIDTH * 0.8,
            backgroundColor: "#b6499c",
            borderRadius: 10,
            marginTop: 10,
            marginRight: 12,
          }}>
          <View style={styles.colorfull_Cards}>
            <View>
              <Text style={styles.hello}>Online Physio</Text>
            </View>

            <View>
              <Text style={styles.best}>
                Connect With certified, Specialized And Experienced
                Physiotherapists
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 15,
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.just}>RS 399/Session</Text>
              </View>
              <View>
                <Image
                  resizeMode="cover"
                  style={{
                    height: 70,
                    width: 80,
                    flex: 1,
                    alignSelf: "flex-end",
                  }}
                  source={require("../assets/therapist.png")}></Image>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  colorfull_Cards: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },

  hello: {
    //fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "white",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  best: {
    //fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "#fff",
  },
  just: {
    backgroundColor: "white",
    borderRadius: 10,
    //height: 'fit-content',
    padding: 5,
    //fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: "#5861a4",
    letterSpacing: 0.3,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    //width: 'fit-content'
  },
});

export default Carousel;
