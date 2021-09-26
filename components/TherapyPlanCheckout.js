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

function TherapyPlanCheckout({ navigation }) {
  return (
    <View>
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
                  background: "rgb(245, 247, 250)",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{ color: "#a5a5a5", paddingTop: 3, paddingBottom: 3 }}
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
                  background: "rgb(150, 162, 184)",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{ color: "white", paddingTop: 3, paddingBottom: 3 }}
                >
                  Checkout
                </Text>
              </View>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </View>
  );
}

export default TherapyPlanCheckout;
