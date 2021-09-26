import React, { Component, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { TouchableRipple, Surface } from "react-native-paper";
import { Grid, Row, Col } from "react-native-easy-grid";

const { width, height } = Dimensions.get("screen");

function TherapyPlanDetails({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 100 }}>
        <Grid>
          <Row style={{ paddingTop: 25, paddingBottom: 15 }}>
            <Col>
              <View
                style={{
                  borderRadius: 10,
                  margin: 10,
                  background: "rgb(245, 247, 250)",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{ color: "#a5a5a5", paddingTop: 3, paddingBottom: 3 }}
                >
                  Plan
                </Text>
              </View>
            </Col>
            <Col>
              <View
                style={{
                  borderRadius: 10,
                  margin: 10,
                  background: "rgb(150, 162, 184)",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{ color: "white", paddingTop: 3, paddingBottom: 3 }}
                >
                  Details
                </Text>
              </View>
            </Col>
            <Col>
              <View
                style={{
                  borderRadius: 10,
                  margin: 10,
                  background: "rgb(245, 247, 250)",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{ color: "#a5a5a5", paddingTop: 3, paddingBottom: 3 }}
                >
                  Checkout
                </Text>
              </View>
            </Col>
          </Row>

          <Row style={{ marginLeft: 16, marginBottom: 9 }}>
            <Text style={{ fontSize: 20 }}>Review Your Therapy Plan</Text>
          </Row>
          <View style={styles.box}>
            <Row>
              <Col size={2}>
                <View>
                  <Row style={{ paddingBottom: 20 }}>
                    <Image
                      style={{ height: 20, width: 20 }}
                      source={require("../assets/protection.png")}
                    ></Image>
                    <Text style={{ marginLeft: 8, paddingTop: 2 }}>
                      Verified
                    </Text>
                  </Row>
                  <Text style={styles.doc}>Anna Frued</Text>
                  <Text style={styles.exper}>7 years of experience</Text>
                </View>
              </Col>

              <Col size={1} style={{ textAlign: "center" }}>
                <Image
                  style={{ height: 90, width: 90, borderRadius: 60 }}
                  source={require("../assets/therapist.jpg")}
                ></Image>
              </Col>
            </Row>
          </View>

          <View
            style={{
              marginLeft: 20,
              marginTop: 12,
              marginRight: 20,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: "rgb(227, 233, 237)",
              borderStyle: "solid",
            }}
          >
            <Row style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}>Summary</Text>
            </Row>

            <Row>
              <Col size={3}>
                <Text style={styles.exper}>
                  {route.params.plan} Sessions With Video 30 min/session,
                  Unlimited Audio And Text Messaging{" "}
                </Text>
              </Col>
              <Col size={1} style={{ textAlign: "center" }}>
                <Text style={styles.exper}>₹{route.params.price}</Text>
              </Col>
            </Row>
          </View>

          <Row
            style={{
              marginBottom: 20,
              marginLeft: 20,
              marginTop: 20,
              marginRight: 20,
            }}
          >
            <Col size={3}>
              <Text style={{ fontSize: 16 }}>Total</Text>
            </Col>

            <Col size={1} style={{ textAlign: "center" }}>
              <Text style={{ fontSize: 16, letterSpacing: 0.6 }}>
                ₹{route.params.price}
              </Text>
            </Col>
          </Row>
        </Grid>
      </ScrollView>

      <View
        style={{
          position: "sticky",
          bottom: 0,
          borderTopWidth: 1,
          borderStyle: "solid",
          borderTopColor: "#f2f2f2",
          backgroundColor: "white",
        }}
      >
        <TouchableRipple
          style={styles.buttonStyle}
          rippleColor="#486939"
          onPress={() => {
            navigation.navigate("Therapy Plan Checkout");
          }}
        >
          <Text style={styles.buttonTextStyle}>Checkout</Text>
        </TouchableRipple>
      </View>
    </View>
  );
}

export default TherapyPlanDetails;

const styles = StyleSheet.create({
  box: {
    //border: '1px solid rgb(229, 229, 235)',
    margin: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  doc: {
    //fontFamily: 'Nunito',
    fontSize: 16,
    color: "black",
  },
  exper: {
    //fontFamily: 'Nunito-SemiBold',
    paddingTop: 2,
    color: "rgb(34, 47, 45)",
    letterSpacing: 0.2,
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
    marginLeft: 55,
    marginRight: 55,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    //fontFamily: 'Nunito'
  },
});
