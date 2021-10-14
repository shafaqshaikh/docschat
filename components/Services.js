import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { TouchableRipple } from "react-native-paper";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height * 0.6;

var s = require("../Style");
class Services extends Component {
  state = {
    home: true,
    doctor: false,
  };
  componentDidMount() {}

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //         main: true
  //     };
  // }

  render() {
    return (
      <View style={{ padding: 16 }}>
        {this.state.home == true && (
          <View style={styles.container}>
            <View style={styles.home}>
              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{
                  flexDirection: "column",
                  flex: 1,
                }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/counseler.png")}></Image>
                  <Text style={styles.cardtext}>Talk Therapy</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/therapist.png")}></Image>
                  <Text style={styles.cardtext}>Physio Therapy</Text>
                </View>
              </TouchableRipple>
            </View>

            <View style={styles.home}>
              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/diet.png")}></Image>
                  <Text style={styles.cardtext}>Nutritionist</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/virus.png")}></Image>
                  <Text style={styles.cardtext}>Covid-19</Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        )}

        {this.state.doctor == true && (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingLeft: 10,
                paddingTop: 15,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ home: true, doctor: false });
                  }}>
                  <Image
                    style={{ height: 18, width: 24 }}
                    source={require("../assets/back.png")}></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Text style={styles.content_tect}>Talk to a Doctor</Text>

              <Text style={styles.doctor}>
                Consult with Top Doctors Online, 24x7
              </Text>
            </View>

            <View style={{ padding: 25 }}>
              <TouchableRipple
                style={styles.buttonStyle}
                rippleColor="#486939"
                onPress={() => {
                  this.props.ganda.navigate("Consult A Doctor");
                }}>
                <Text style={styles.buttonTextStyle}>Start Consultation</Text>
              </TouchableRipple>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
  },

  home: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardtext: { fontSize: 14, paddingTop: 10 },

  content_tect: {
    fontSize: 16,
    paddingBottom: 20,
  },

  doctor: {
    color: "#050a4e",
    //fontFamily: "Nunito",
    fontSize: 18,
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#969696",
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    color: "#4585f4",
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    //fontFamily: "Nunito",
  },
});

export default Services;
