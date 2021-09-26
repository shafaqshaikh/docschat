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
import firebase from "firebase";
import { Grid, Row, Col } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";

const DATA = [
  {
    id: "09:00 am",
    title: "09:00 am",
  },
  {
    id: "09:30 am",
    title: "09:30 am",
  },
  {
    id: "10:00 am",
    title: "10:00 am",
  },
  {
    id: "10:30 am",
    title: "10:30 am",
  },
  {
    id: "11:00 am",
    title: "11:00 am",
  },
  {
    id: "11:30 am",
    title: "11:30 am",
  },
  {
    id: "12:00 am",
    title: "12:00 am",
  },
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
const date = d.getDate();
const dayName = days[d.getDay()];
const monthName = monthNames[d.getMonth()];

const db = firebase.firestore();

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstScreen: true,
      selectedId: "",
      spinner: false,
    };
  }

  render() {
    const Item = ({ item, onPress, style }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        {item.id != this.state.selectedId && (
          <Text style={styles.title}>{item.title}</Text>
        )}
        {item.id == this.state.selectedId && (
          <Text style={styles.click}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor =
        item.id === this.state.selectedId ? "#0fc1a7" : "white";
      const borderColor =
        item.id === this.state.selectedId ? "white" : "#0d3e37b5";

      return (
        <Grid>
          <Row style={{ justifyContent: "center" }}>
            <Item
              item={item}
              onPress={() => this.setState({ selectedId: item.id })}
              style={{
                borderColor,
                backgroundColor,
                borderRadius: 20,
                borderWidth: 1,
                borderStyle: "solid",
              }}
            />
          </Row>
        </Grid>
      );
    };

    return (
      <View style={{ margin: 40, marginRight: 5, marginLeft: 5 }}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <View>
          <Row>
            <Text style={styles.header}>
              {dayName.slice(0, 3)}, {d.getDate()} {monthName}
            </Text>
          </Row>

          <FlatList
            columnWrapperStyle={{ justifyContent: "center", marginBottom: 20 }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={this.state.selectedId}
            numColumns={3}
          />

          <TouchableRipple
            disabled={!this.state.selectedId}
            style={!this.state.selectedId ? styles.disable : styles.book}
            onPress={() => {
              this.setState({ spinner: !this.state.spinner });
              db.collection("NUMBERS")
                .doc(this.props.route.params.docID)
                .collection("MESSAGES")
                .add({
                  text: `Your Video Session is confirmed and scheduled at ${
                    this.state.selectedId
                  } on ${dayName.slice(0, 3)} ${date} ${monthName}`,
                  createdAt: new Date().getTime(),
                  user: {
                    _id: 1,
                    name: "Assistant",
                  },
                })
                .then(() => {
                  this.props.navigation.navigate("Dr. Basith", {
                    docID: this.props.route.params.docID,
                    name: this.props.route.params.name,
                  });
                  this.setState({ spinner: !this.state.spinner });
                });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                margin: "auto",
                fontSize: 17,
                fontFamily: "Nunito",
                color: "white",
              }}
            >
              Confirm Booking
            </Text>
          </TouchableRipple>
        </View>
      </View>
    );
  }
}

export default TimeSlot;

const styles = StyleSheet.create({
  header: {
    //fontFamily: 'Nunito-ExtraBold',
    margin: 0,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
    letterSpacing: 0.1,
    color: "rgb(34, 47, 45)",
    paddingLeft: 10,
    paddingBottom: 20,
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
    margin: 35,
    marginTop: 20,
    color: "rgb(255, 255, 255)",
    backgroundColor: "#7DE24E",
    height: 50,
    borderRadius: 10,
  },
  disable: {
    margin: 35,
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
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    fontSize: 15,
    //fontFamily: 'Nunito',
    letterSpacing: 0.3,
    color: "#0d3e37b5",
  },
  click: {
    fontSize: 15,
    //fontFamily: 'Nunito',
    letterSpacing: 0.3,
    color: "white",
  },
  spinnerTextStyle: {
    //fontFamily: 'Nunito-SemiBold',
    marginTop: 20,
    //height: 'fit-content',
    color: "#FFF",
  },
});
