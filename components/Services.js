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
      <View style={styles.container}>
        {this.state.home == true && (
          <View>
            <View style={styles.home}>
              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/counseler.png")}
                  ></Image>
                  <Text style={s.fontFamily}>Talk Therapy</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/therapist.png")}
                  ></Image>
                  <Text style={s.fontFamily}>Physio Therapy</Text>
                </View>
              </TouchableRipple>
            </View>

            <View style={styles.home}>
              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/diet.png")}
                  ></Image>
                  <Text style={s.fontFamily}>Nutritionist</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                rippleColor="#486939"
                onPress={() => {
                  this.setState({ home: false, doctor: true });
                }}
                style={{ flex: 1, flexDirection: "column" }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require("../assets/virus.png")}
                  ></Image>
                  <Text style={s.fontFamily}>Covid-19</Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        )}

        {this.state.doctor == true && (
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ home: true, doctor: false });
                    }}
                  >
                    <Image
                      style={{ height: 12, width: 16, marginLeft: 10 }}
                      source={require("../assets/back.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{ paddingLeft: 20, flex: 9, flexDirection: "column" }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text>Talk to a Doctor</Text>
                </View>
                <View style={{}}>
                  <Text style={styles.doctor}>
                    Consult with Top Doctors Online, 24x7
                  </Text>
                </View>
              </View>
            </View>
            <TouchableRipple
              style={styles.buttonStyle}
              rippleColor="#486939"
              onPress={() => {
                this.props.ganda.navigate("Consult A Doctor");
              }}
            >
              <Text style={styles.buttonTextStyle}>Start Consultation</Text>
            </TouchableRipple>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    //boxShadow: "0 0 15px rgba(24,24,24,.161)",
    margin: 23,
    borderRadius: 30,
    paddingBottom: 20,
    paddingTop: 20,
    marginTop: 33,
  },
  doctor: {
    color: "#050a4e",
    //fontFamily: "Nunito",
    fontSize: 17,
    lineHeight: 22,
    paddingTop: 25,
    paddingBottom: 10,
    paddingRight: 30,
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#969696",
    borderRadius: 30,
    alignItems: "center",
    marginTop: 23,
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
    marginLeft: 45,
    marginRight: 45,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    //fontFamily: "Nunito",
  },
});

export default Services;
