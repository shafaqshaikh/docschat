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
      data: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("number").then((result) => {
      // console.log("====================================");
      // console.log(result);
      // console.log("====================================");
      if (result != null) {
        var citiesRef = db.collection("NUMBERS");
        var query = citiesRef
          .where("mobile", "==", result)
          .get()
          .then((querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              data.id = doc.id;
              // console.log("====================================");
              // console.log(doc.id);
              // console.log("====================================");
              return data;
            });
            this.setState({ data: messages });
            // console.log("====================================");
            // console.log(messages.length);
            // console.log("====================================");
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
  }
  componentDidUpdate() {
    AsyncStorage.getItem("number").then((result) => {
      // console.log("====================================");
      // console.log(result);
      // console.log("====================================");
      if (result != null) {
        var citiesRef = db.collection("NUMBERS");
        var query = citiesRef
          .where("mobile", "==", result)
          .get()
          .then((querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              data.id = doc.id;
              // console.log("====================================");
              // console.log(doc.id);
              // console.log("====================================");
              return data;
            });
            this.setState({ data: messages });
            // console.log("====================================");
            // console.log(messages.length);
            // console.log("====================================");
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
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#fff",
              }}>
              <Image
                style={{ height: 60, width: 60, borderRadius: 40 }}
                source={{ uri: data.doctorImage }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                paddingLeft: 16,
                justifyContent: "space-between",
              }}>
              <Text style={styles.dr_name}>{data.doctorName}</Text>

              <Text style={styles.dept_name}>
                {department(data.department)}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.cr_date}>{createdAt(data.createdAt)}</Text>
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
          // ListFooterComponent={({ highlighted }) => (
          //   <View>
          //     {this.state.data && <View style={{ marginBottom: 33 }} />}
          //   </View>
          // )}
          // ListHeaderComponent={({ highlighted }) => (
          //   <View style={styles.header}>
          //     {this.state.data && (
          //       <Text style={styles.text}>Consultations</Text>
          //     )}
          //   </View>
          // )}
        />
      </View>
      // <View>
      //   <FlatList
      //     data={this.data}
      //     keyExtractor={(item) => item.id}
      //     ItemSeparatorComponent={({ highlighted }) => (
      //       <View style={styles.break} />
      //     )}
      //     renderItem={({ item }) => {
      //       <Text style={{ fontSize: 50 }}>hiiii</Text>;
      //     }}
      //   />
      // </View>
    );
  }
}
export default ConsultationList;

const styles = StyleSheet.create({
  break: {
    marginBottom: 5,
    marginTop: 5,
    borderStyle: "solid",
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
    //boxShadow: 'rgb(20 33 60 / 18%) 0px 5px 12px',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 3,
    },
    elevation: 3,
  },

  // consultation: {},

  dr_name: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#000",
  },

  dept_name: {
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#636363",
  },

  cr_date: {
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#636363",
    paddingRight: 10,
  },
});
