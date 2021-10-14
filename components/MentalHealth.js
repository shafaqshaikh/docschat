import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;

class MentalHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: ["medaid"],
      desc: "",
      depression: false,
      relationships: false,
      AnxNstress: false,
      chronic: false,
      trauma: false,
      subsatnace: false,
      anger: false,
      mood: false,
      ocd: false,
      lghdtv: false,
      child: false,
      family: false,
      parenting: false,
      workplace: false,
      others: false,
      userData: null,
      data: [
        {
          id: "1",
          title: "Depression",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "2",
          title: "Relationships",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "3",
          title: "Anxiety & Stress",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "4",
          title: "Chronic illness",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "5",
          title: "Trauma & grief",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "6",
          title: "Substance abuse",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "7",
          title: "Anger management",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "8",
          title: "Mood disorders",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "9",
          title: "OCD",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "10",
          title: "LGBTQIA+",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "11",
          title: "Childhood abuse",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "12",
          title: "Family conflict",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "13",
          title: "Parenting",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "14",
          title: "Workplace",
          isSelect: false,
          selectedClass: styles.box,
        },
        {
          id: "15",
          title: "I Don't Know",
          isSelect: false,
          selectedClass: styles.box,
        },
      ],
      specialty: [
        {
          id: "11",
          title: "Couples Therapy",
          image: require("../assets/couples.png"),
        },
        {
          id: "22",
          title: "Teen Therapy",
          image: require("../assets/teen.png"),
        },
        {
          id: "33",
          title: "Anxiety & Stress",
          isSelect: false,
          image: require("../assets/anxiety.png"),
        },
        {
          id: "44",
          title: "Depression",
          isSelect: false,
          image: require("../assets/depression.png"),
        },
        {
          id: "55",
          title: "Child Therapy",
          isSelect: false,
          image: require("../assets/child.png"),
        },
        {
          id: "66",
          title: " Clinical Assessment",
          isSelect: false,
          image: require("../assets/online.png"),
        },
      ],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("user").then((res) => {
      if (res == null) {
        AsyncStorage.setItem("user", "anonymous");
        this.setState({ userData: "anonymous" });
      } else if (res != null) {
        this.setState({ userData: res });
      }
    });
  }

  pushPop(flag, value) {
    if (flag) {
      this.setState({ problem: this.state.problem.concat(value) }, () => {
        console.log(this.state.problem);
      });
    } else if (!flag) {
      var arr = this.state.problem;
      var index = arr.indexOf(value);
      if (index >= 0) {
        arr.splice(index, 1);
        console.log(this.state.problem);
      }
    }
  }

  render() {
    const Item = ({ data }) => (
      <TouchableRipple
        onPress={() => {
          data.isSelect = !data.isSelect;
          data.selectedClass = data.isSelect ? styles.boxHigh : styles.box;

          const index = this.state.data.findIndex(
            (item) => data.id === item.id
          );

          this.state.data[index] = data;
          this.setState(
            {
              data: this.state.data,
            },
            () => {
              this.pushPop(data.isSelect, data.title);
            }
          );
        }}
        style={[styles.box, data.selectedClass]}>
        <Text style={{ fontSize: 13 }}>{data.title}</Text>
      </TouchableRipple>
    );

    const renderItem = ({ item }) => <Item data={item} />;

    const Specialties = ({ data }) => (
      <TouchableRipple
        key={data.id}
        onPress={() => {
          this.setState({ problem: data.title }, () => {
            this.props.navigation.navigate("Patient Details", {
              problem: this.state.problem,
              user: this.state.userData,
            });
          });
        }}
        style={styles.box}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4, alignItems: "center" }}>
            <Image
              style={{ height: 35, width: 47 }}
              source={data.image}></Image>
          </View>

          <View style={{ flex: 6, justifyContent: "center" }}>
            <Text style={{ fontSize: 13 }}>{data.title}</Text>
          </View>
        </View>
      </TouchableRipple>
    );

    const renderSpecialties = ({ item }) => <Specialties data={item} />;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 0.9, paddingLeft: 5, paddingRight: 5, height: 100 }}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#29358af5",
                borderRadius: 10,
                marginTop: 8,
                marginLeft: 7,
                marginRight: 7,
              }}>
              <View
                style={{
                  flex: 0.7,
                  paddingLeft: 12,
                  paddingTop: 13,
                  paddingBottom: 10,
                }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.hello}>Say Hello Therapist.</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.best}>Connect With Best Therapists.</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.just}>At Just Rs300</Text>
                </View>
              </View>

              <View style={{ flex: 0.3, alignItems: "center" }} size={1}>
                <Image
                  style={{ height: 120, width: 60 }}
                  source={require("../assets/pysch-phone.png")}></Image>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingTop: 15,
                paddingLeft: 11,
                paddingRight: 17,
                paddingBottom: 5,
              }}>
              <Text>Know Specialty ?</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[0].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 16, paddingTop: 16 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[0].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[0].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[1].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 16, paddingTop: 16 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[1].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[1].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[2].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 15, paddingTop: 15 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[2].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[2].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[3].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 15, paddingTop: 15 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[3].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[3].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[4].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 15, paddingTop: 15 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[4].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[4].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableRipple
                  onPress={() => {
                    this.setState(
                      { problem: this.state.specialty[5].title },
                      () => {
                        this.props.navigation.navigate("Patient Details", {
                          problem: this.state.problem,
                          user: this.state.userData,
                        });
                      }
                    );
                  }}
                  style={[styles.box, { paddingBottom: 15, paddingTop: 15 }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, alignItems: "center" }}>
                      <Image
                        style={{ height: 35, width: 47 }}
                        source={this.state.specialty[5].image}></Image>
                    </View>

                    <View style={{ flex: 6, justifyContent: "center" }}>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.specialty[5].title}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              </View>
            </View>
            <FlatList
              data={this.state.specialty}
              renderItem={renderSpecialties}
              keyExtractor={(item) => item.id}
              numColumns={2}
              extraData={this.state}
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingTop: 15,
                paddingLeft: 11,
                paddingRight: 17,
                paddingBottom: 5,
              }}>
              <Text>Know Your Symptom ?</Text>
            </View>

            <FlatList
              data={this.state.data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              extraData={this.state}
            />
          </ScrollView>
        </View>

        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <View
            style={{
              borderTopWidth: 1,
              borderStyle: "solid",
              borderTopColor: "#f2f2f2",
              backgroundColor: "white",
            }}>
            <TouchableRipple
              style={styles.buttonStyle}
              rippleColor="#486939"
              onPress={() => {
                this.props.navigation.navigate("Patient Details", {
                  problem: this.state.problem,
                  user: this.state.userData,
                });
              }}>
              <Text style={styles.buttonTextStyle}>Next</Text>
            </TouchableRipple>
          </View>
        </View>
      </View>
    );
  }
}
export default MentalHealth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  box: {
    height: 70,
    borderStyle: "solid",
    borderWidth: 1,
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "#A9A9B0",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito',
    //boxShadow: '0 2px 5px 0 hsl(0deg 0% 82% / 50%)',
    borderRadius: 4,
    padding: 6,
    //border: "none",
    fontSize: 11,
    textAlign: "center",
    justifyContent: "center",
    //border: '1px solid #e5e5eb',
    margin: 10,
    flex: 1,
  },
  boxHigh: {
    height: 70,
    color: "rgba(0, 0, 0, 0.87)",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito',
    borderRadius: 4,
    padding: 6,
    //border: 'none',
    fontSize: 11,
    textAlign: "center",
    justifyContent: "center",
    //border: '1px solid #7DE24E',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#70AD53",
    backgroundColor: "#70ad532e",
    //boxShadow: "rgb(209 209 209 / 50%) 0px 2px 5px 0px",
    //border: '1px solid #e5e5eb',
    margin: 10,
    flex: 1,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito-SemiBold',
    //boxShadow: 'rgb(224 224 224) 0px 0px 6px 0px',
    borderRadius: 4,
    padding: 6,
    //border: "none",
    fontSize: 13,
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
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    //fontFamily: 'Nunito'
  },
  hello: {
    //fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "white",
  },
  best: {
    //fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: "ghostwhite",
    letterSpacing: 0.3,
    color: "white",
  },
  just: {
    backgroundColor: "white",
    borderRadius: 10,
    //height: 'fit-content',
    padding: 5,
    //fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
    color: "#5861a4",
    letterSpacing: 0.3,
    paddingLeft: 10,
    paddingRight: 10,
    //width: 'fit-content'
  },
});
