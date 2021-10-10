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
                }}
              >
                <Text
                  style={{
                    color: "#a5a5a5",
                    paddingTop: 3,
                    paddingBottom: 3,
                    textAlign: "center",
                  }}
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
                }}
              >
                <Text
                  style={{
                    color: "#a5a5a5",
                    paddingTop: 3,
                    paddingBottom: 3,
                    textAlign: "center",
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
                  backgroundColor: "#a5a5a5",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    paddingTop: 3,
                    paddingBottom: 3,
                    textAlign: "center",
                  }}
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
