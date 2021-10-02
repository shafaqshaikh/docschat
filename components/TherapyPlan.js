import React, { Component, useContext } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { TouchableRipple, Surface } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

class TherapyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: "TherapySession1",
      plan1: true,
      plan2: false,
      plan3: false,
      price: "600",
    };
  }

  render() {
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
                    background: "rgb(150, 162, 184)",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", paddingTop: 3, paddingBottom: 3 }}
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
                    background: "rgb(245, 247, 250)",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#a5a5a5",
                      paddingTop: 3,
                      paddingBottom: 3,
                    }}
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
                    style={{
                      color: "#a5a5a5",
                      paddingTop: 3,
                      paddingBottom: 3,
                    }}
                  >
                    Checkout
                  </Text>
                </View>
              </Col>
            </Row>

            <TouchableRipple
              onPress={() => {
                this.setState({
                  plan: "Single",
                  price: "600",
                  plan1: true,
                  plan2: false,
                  plan3: false,
                });
              }}
              //rippleColor="rgb(112 173 83)"
              style={this.state.plan1 == true ? styles.selected : styles.ripple}
            >
              <Row>
                <Col size={3}>
                  <View>
                    <Text style={styles.session}>Single Session</Text>
                    <Text style={styles.video}>1 Live Session (30 min)</Text>
                    <Text style={styles.message}>
                      Unlimited Text and Audio Messaging
                    </Text>
                  </View>
                </Col>

                <Col size={1} style={{ textAlign: "center" }}>
                  <Text style={styles.price}>₹600</Text>
                </Col>
              </Row>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.setState({
                  plan: "5",
                  price: "2700",
                  plan1: false,
                  plan2: true,
                  plan3: false,
                });
              }}
              //rippleColor="rgb(112 173 83)"
              style={this.state.plan2 == true ? styles.selected : styles.ripple}
            >
              <Row>
                <Text style={styles.recommended}>Recommended</Text>
                <Col size={3}>
                  <View>
                    <Text style={styles.session}>5 Sessions</Text>
                    <Text style={styles.video}>
                      5 Live Sessions (30 min/session)
                    </Text>
                    <Text style={styles.message}>
                      Unlimited Text and Audio Messaging
                    </Text>
                  </View>
                </Col>

                <Col size={1} style={{ textAlign: "center" }}>
                  <Text style={styles.price}>₹2700</Text>
                </Col>
              </Row>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.setState({
                  plan: "10",
                  price: "5000",
                  plan1: false,
                  plan2: false,
                  plan3: true,
                });
              }}
              //rippleColor="rgb(112 173 83)"
              style={this.state.plan3 == true ? styles.selected : styles.ripple}
            >
              <Row>
                <Col size={3}>
                  <View>
                    <Text style={styles.session}>10 Sessions</Text>
                    <Text style={styles.video}>
                      10 Live Sessions (30 min/session)
                    </Text>
                    <Text style={styles.message}>
                      Unlimited Text and Audio Messaging
                    </Text>
                  </View>
                </Col>

                <Col size={1} style={{ textAlign: "center" }}>
                  <Text style={styles.price}>₹5000</Text>
                </Col>
              </Row>
            </TouchableRipple>
          </Grid>
        </ScrollView>

        <View
          style={{
            position: "absolute",
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
              this.props.navigation.navigate("Therapy Plan Details", {
                plan: this.state.plan,
                price: this.state.price,
              });
            }}
          >
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableRipple>
        </View>
      </View>
    );
  }
}

export default TherapyPlan;

const styles = StyleSheet.create({
  ripple: {
    //border: '1px solid rgb(229, 229, 235)',
    //boxShadow: 'rgb(209 209 209 / 50%) 0px 2px 5px 0px',
    margin: 12,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#70AD53",
    backgroundColor: "#70ad532e",
    //boxShadow: 'rgb(209 209 209 / 50%) 0px 2px 5px 0px',
    margin: 12,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  session: {
    //fontFamily: 'Nunito',
    fontSize: 15,
    color: "rgb(0, 106, 97)",
  },
  video: {
    //fontFamily: 'Nunito-SemiBold',
    paddingTop: 6,
    color: "rgb(34, 47, 45)",
  },
  message: {
    //fontFamily: 'Nunito-Light',
    paddingTop: 2,
    fontSize: 13,
  },
  price: {
    //fontFamily: 'Nunito-ExtraBold',
    letterSpacing: 0.6,
    color: "rgb(34, 47, 45)",
    fontSize: 15,
  },
  recommended: {
    position: "absolute",
    top: -20,
    right: -10,
    backgroundColor: "#0d2da0",
    color: "white",
    //fontFamily: 'Nunito',
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 9,
    paddingLeft: 9,
    letterSpacing: 0.5,
    fontSize: 12,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
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
