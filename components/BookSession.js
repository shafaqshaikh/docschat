import React, { Component, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { TouchableRipple, Surface } from "react-native-paper";
import { Grid, Row, Col } from "react-native-easy-grid";

class BookSession extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ margin: 40, marginRight: 20, marginLeft: 20 }}>
        <Grid>
          <Row>
            <Text style={styles.header}>Live Video Sessions</Text>
          </Row>

          <View style={styles.sessionBack}>
            <Text style={styles.session}>
              You Have No Live Video Sessions Scheduled
            </Text>
          </View>

          <TouchableRipple
            style={styles.book}
            onPress={() => {
              this.props.navigation.navigate("Time Slot", {
                docID: this.props.route.params.docID,
                name: this.props.route.params.name,
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                margin: "auto",
                fontSize: 17,
                color: "white",
              }}
            >
              Book Session
            </Text>
          </TouchableRipple>
        </Grid>
      </View>
    );
  }
}

export default BookSession;

const styles = StyleSheet.create({
  header: {
    //fontFamily: 'Nunito-ExtraBold',
    margin: 0,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
    letterSpacing: 0.1,
    color: "rgb(34, 47, 45)",
    paddingLeft: 2,
  },
  session: {
    //fontFamily: 'Nunito',
    margin: 0,
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 23,
    letterSpacing: 0.1,
    color: "rgb(104, 118, 141)",
    paddingLeft: 15,
  },
  sessionBack: {
    backgroundColor: "rgb(239, 243, 250)",
    borderRadius: 10,
    padding: 15,
    paddingLeft: 0,
    marginTop: 15,
  },
  book: {
    marginTop: 20,
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(216, 216, 224)",
    height: 50,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
