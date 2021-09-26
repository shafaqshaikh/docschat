import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

const db = firebase.firestore();

const department = (val) => {
  if (val == 1) {
    return "Talk Therapy";
  }
};

const createdAt = (val) => {
  var date = new Date(val);
  return date.toLocaleDateString();
};

class ConsultationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("number").then((result) => {
      if (result != null) {
        var citiesRef = db.collection("NUMBERS");
        var query = citiesRef
          .where("mobile", "==", result)
          .get()
          .then((querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              data.id = doc.id;
              return data;
            });
            this.setState({ data: messages });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
  }

  render() {
    const Item = ({ data }) => (
      <TouchableRipple
        style={styles.chatlist}
        rippleColor="white"
        onPress={() => {
          this.props.ganda.navigate("Dr. Basith", {
            docID: data.id,
            name: data.userInfo.patientFName,
          });
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View
            style={{
              flexDirection: "column",
              flex: 0.25,
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 40 }}
              source={data.doctorImage}
            ></Image>
          </View>

          <View style={{ flexDirection: "column", flex: 0.5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#222f2d" }}>
                {data.doctorName}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>
                {department(data.department)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", flex: 0.25 }}>
            <Text style={{ fontSize: 11, color: "grey" }}>
              {createdAt(data.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    );

    const renderItem = ({ item }) => <Item data={item} />;

    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.props}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={styles.break} />
          )}
          ListFooterComponent={({ highlighted }) => (
            <View>
              {this.state.data && <View style={{ marginBottom: 33 }} />}
            </View>
          )}
          ListHeaderComponent={({ highlighted }) => (
            <View style={styles.header}>
              {this.state.data && (
                <Text style={styles.text}>Consultations</Text>
              )}
            </View>
          )}
        />
      </View>
    );
  }
}
export default ConsultationList;

const styles = StyleSheet.create({
  break: {
    marginBottom: 5,
    marginTop: 5,
    // borderStyle: 'solid',
    // borderColor: '#0000003b',
    // marginLeft: 86,
    // marginRight: 19,
    // borderWidth: 0.1,
    // borderTopWidth: 0,
    // borderRightWidth: 0,
    // borderLeftWidth: 0
  },
  header: {
    marginLeft: 13,
    marginBottom: 13,
    //fontFamily: 'Nunito',
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    //fontFamily: 'Nunito-Regular',
    color: "gray",
    letterSpacing: 0.7,
  },
  chatlist: {
    marginLeft: 12,
    marginRight: 12,
    //boxShadow: 'rgb(20 33 60 / 18%) 0px 5px 12px',
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
  },
});
