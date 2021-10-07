import React, { Component, createRef } from "react";
import {
  Image,
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import { Picker } from "@react-native-picker/picker";
// import FlashMessage from "react-native-flash-message";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";
import { isSignedIn } from "../helpers/storageHelper";
import Spinner from "react-native-loading-spinner-overlay";
import { v1 as uuidv1 } from "uuid";

const HEIGHT = Dimensions.get("window").height * 0.89;
const WIDTH = Dimensions.get("window").width;
const db = firebase.firestore();
const uid = AsyncStorage.getItem("user");

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: "",
      patientSName: "",
      patientFName: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      maleBtn: false,
      femaleBtn: false,
      myselfBtn: false,
      motherBtn: false,
      fatherBtn: false,
      husbandBtn: false,
      wifeBtn: false,
      daughterBtn: false,
      sonBtn: false,
      otherBtn: false,
      otherGenderBtn: false,
      modalVisible: false,
      spinner: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("user").then((result) => {
      if (result != null) {
        if (this.props.route.params == null) {
          this.props.navigation.navigate("Home");
        }
      } else if (result == null) {
        this.props.navigation.navigate("Home");
      }
    });
  }

  componentDidMount() {
    AsyncStorage.getItem("number").then((result) => {
      if (result != null) {
        this.setState({ mobile: result });
      } else {
        this.setState({ mobile: "" });
      }
    });
  }

  handleOtpButton() {
    if (!this.state.mobile) {
      showMessage({
        message: "Enter the mobile number",
        type: "warning",
      });
      return;
    }

    var re = /^[0-9]{10}$/;
    var res = re.test(this.state.mobile);
    if (res == false) {
      showMessage({
        message: "Enter a valid mobile number",
        type: "warning",
      });
      return;
    }

    this.setState({
      spinner: !this.state.spinner,
      modalVisible: !this.state.modalVisible,
    });

    var uid = uuidv1();
    var firstPair = ["user", this.state.patientFName];
    var secondPair = ["uid", uid];
    var thirdPair = ["number", this.state.mobile];
    AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);

    var dataToSend = {
      patient: this.state.patient,
      patientFName: this.state.patientFName,
      patientSName: this.state.patientSName,
      age: this.state.age,
      gender: this.state.gender,
      mobile: this.state.mobile,
      email: this.state.email,
      health: this.props.route.params,
    };

    db.collection("NUMBERS")
      .add({
        mobile: this.state.mobile,
        uuid: uid,
        name: this.state.patientFName,
        docPresent: false,
        department: "1",
        createdAt: new Date().getTime(),
        userInfo: dataToSend,
      })
      .then((docRef) => {
        docRef.collection("MESSAGES").add({
          _id: 1,
          text: "Do you have any other health problems?",
          createdAt: new Date().getTime(),
          quickReplies: {
            type: "radio", // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: "Yes",
                value: "First",
              },
              {
                title: "No",
                value: "First",
              },
            ],
          },
          user: {
            _id: 1,
            name: "Assistant",
          },
        });
        this.setState({ spinner: !this.state.spinner });
        this.props.navigation.navigate("Dr. Basith", {
          docID: docRef.id,
          name: this.state.patientFName,
        });
      });
  }

  handleSubmitButton() {
    if (!this.state.patient) {
      showMessage({
        message: "Please select the patient",
        type: "warning",
      });
      return;
    }

    if (!this.state.patientFName) {
      showMessage({
        message: "Enter the First name of the patient",
        type: "warning",
      });
      return;
    }

    if (!this.state.age) {
      showMessage({
        message: "Enter the age of the patient",
        type: "warning",
      });
      return;
    }

    if (!this.state.gender) {
      showMessage({
        message: "Enter the gender of the patient",
        type: "warning",
      });
      return;
    }

    var dataToSend = {
      patient: this.state.patient,
      patientFName: this.state.patientFName,
      patientSName: this.state.patientSName,
      age: this.state.age,
      gender: this.state.gender,
      mobile: this.state.mobile,
      email: this.state.email,
      health: this.props.route.params,
    };

    if (this.props.route.params.user == "anonymous") {
      this.setState({ modalVisible: !this.state.modalVisible });
    } else if (this.props.route.params.user != "anonymous") {
      this.setState({ spinner: !this.state.spinner });
      db.collection("NUMBERS")
        .add({
          mobile: this.state.mobile,
          uuid: uuidv1(),
          name: this.state.patientFName,
          docPresent: false,
          department: "1",
          createdAt: new Date().getTime(),
          userInfo: dataToSend,
        })
        .then((docRef) => {
          docRef.collection("MESSAGES").add({
            _id: 1,
            text: "Do you have any other health problems?",
            createdAt: new Date().getTime(),
            quickReplies: {
              type: "radio", // or 'checkbox',
              keepIt: true,
              values: [
                {
                  title: "Yes",
                  value: "First",
                },
                {
                  title: "No",
                  value: "First",
                },
              ],
            },
            user: {
              _id: 1,
              name: "BOT",
            },
          });
          console.log("hiiiiiiii");
          this.setState({ spinner: !this.state.spinner });
          this.props.navigation.navigate("Dr. Basith", {
            docID: docRef.id,
            name: this.state.patientFName,
          });
        });
    }
  }

  render() {
    // const emailInputRef = createRef();
    // const ageInputRef = createRef();
    // const addressInputRef = createRef();
    // const passwordInputRef = createRef();

    var ages = [];
    for (let i = 1; i <= 100; i++) {
      ages.push(<Picker.Item label={i + " years"} value={i} />);
    }
    return (
      <View>
        <Spinner
          visible={this.state.spinner}
          textContent={"Connecting..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.centeredView}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}>
            <ScrollView>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                      style={[styles.button]}
                      onPress={() =>
                        this.setState({
                          modalVisible: !this.state.modalVisible,
                        })
                      }>
                      <Image
                        style={{ height: 25, width: 25 }}
                        source={require("../assets/close.png")}></Image>
                    </Pressable>
                    {/* <Text style={styles.modalText}>Hello World!</Text> */}
                    <View style={{ flexDirection: "column", marginTop: 10 }}>
                      <Text>Doctor Can Reach You For Consultation At</Text>
                      <View style={{ padding: 15 }}>
                        <TextInput
                          style={styles.inputStyle}
                          maxLength={10}
                          onChangeText={(val) => (this.state.mobile = val)}
                          underlineColorAndroid="#f000"
                          placeholder="Mobile Number"
                          keyboardType="numeric"
                          placeholderTextColor="#8b9cb5"
                          // ref={emailInputRef}
                          returnKeyType="next"
                          // onSubmitEditing={() =>
                          //   passwordInputRef.current &&
                          //   passwordInputRef.current.focus()
                          // }
                          blurOnSubmit={false}
                        />
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          activeOpacity={0.5}
                          onPress={() => {
                            this.handleOtpButton();
                          }}>
                          <Text style={styles.buttonTextStyle}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => this.setState({ modalVisible: !this.state.modalVisible})}
              >
                <Text style={styles.textStyle}>Show Modal</Text>
              </Pressable> */}
        </View>

        <View style={{ position: "absolute", top: 36, width: WIDTH }}>
          <FlashMessage ref="myLocalFlashMessage" />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            marginTop: 50,
          }}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}>
            <ScrollView>
              <Text style={styles.TextSectionStyle}>Who Is The Patient?</Text>
              <ScrollView
                contentContainerStyle={{
                  paddingTop: 15,
                  paddingRight: 15,
                  paddingLeft: 15,
                }}
                horizontal>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: true,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "myself",
                    });
                  }}
                  style={
                    this.state.myselfBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Myself</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: true,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "father",
                    });
                  }}
                  style={
                    this.state.fatherBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Father</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: true,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "mother",
                    });
                  }}
                  style={
                    this.state.motherBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Mother</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: true,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "husband",
                    });
                  }}
                  style={
                    this.state.husbandBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Husband</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: true,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "wife",
                    });
                  }}
                  style={
                    this.state.wifeBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Wife</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: true,
                      otherBtn: false,
                      patient: "son",
                    });
                  }}
                  style={
                    this.state.sonBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Son</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: true,
                      sonBtn: false,
                      otherBtn: false,
                      patient: "daughter",
                    });
                  }}
                  style={
                    this.state.daughterBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Daughter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      myselfBtn: false,
                      motherBtn: false,
                      fatherBtn: false,
                      husbandBtn: false,
                      wifeBtn: false,
                      daughterBtn: false,
                      sonBtn: false,
                      otherBtn: true,
                      patient: "Others",
                    });
                  }}
                  style={
                    this.state.otherBtn == true
                      ? styles.buttonRadioPress
                      : styles.buttonRadio
                  }>
                  <Text style={styles.RadioButtonTextStyle}>Other</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={{ paddingTop: 25 }}>
                <Text style={styles.TextSectionStyle}>Patient Name</Text>
                <Row>
                  <Col style={{ padding: 15 }}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={(patientName) =>
                        (this.state.patientFName = patientName)
                      }
                      underlineColorAndroid="#f000"
                      placeholder="First Name"
                      placeholderTextColor="#8b9cb5"
                      // ref={emailInputRef}
                      returnKeyType="next"
                      // onSubmitEditing={() =>
                      //   passwordInputRef.current &&
                      //   passwordInputRef.current.focus()
                      // }
                      blurOnSubmit={false}
                    />
                  </Col>
                  <Col style={{ padding: 15 }}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={(patientName) =>
                        (this.state.patientSName = patientName)
                      }
                      underlineColorAndroid="#f000"
                      placeholder="Last Name"
                      placeholderTextColor="#8b9cb5"
                      // ref={emailInputRef}
                      returnKeyType="next"
                      // onSubmitEditing={() =>
                      //   passwordInputRef.current &&
                      //   passwordInputRef.current.focus()
                      // }
                      blurOnSubmit={false}
                    />
                  </Col>
                </Row>
              </View>

              <View style={{ flexDirection: "column", marginTop: 10 }}>
                <Text style={styles.TextSectionStyle}>Age</Text>
                <View style={{ padding: 15 }}>
                  <TextInput
                    style={styles.inputAgeStyle}
                    onChangeText={(val) => (this.state.age = val)}
                    underlineColorAndroid="#f000"
                    placeholder="Age"
                    keyboardType="numeric"
                    placeholderTextColor="#8b9cb5"
                    // ref={emailInputRef}
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    //   passwordInputRef.current &&
                    //   passwordInputRef.current.focus()
                    // }
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={styles.TextSectionStyle}>Gender</Text>
                <Row style={{ padding: 15 }}>
                  <Col>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          maleBtn: true,
                          femaleBtn: false,
                          otherGenderBtn: false,
                          gender: "male",
                        });
                      }}
                      style={
                        this.state.maleBtn == true
                          ? styles.buttonRadioPress
                          : styles.buttonRadio
                      }>
                      <Text style={styles.RadioButtonTextStyle}>Male</Text>
                    </TouchableOpacity>
                  </Col>

                  <Col>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          femaleBtn: true,
                          maleBtn: false,
                          otherGenderBtn: false,
                          gender: "female",
                        });
                      }}
                      style={
                        this.state.femaleBtn == true
                          ? styles.buttonRadioPress
                          : styles.buttonRadio
                      }>
                      <Text style={styles.RadioButtonTextStyle}>Female</Text>
                    </TouchableOpacity>
                  </Col>

                  <Col>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          femaleBtn: false,
                          maleBtn: false,
                          otherGenderBtn: true,
                          gender: "others",
                        });
                      }}
                      style={
                        this.state.otherGenderBtn == true
                          ? styles.buttonRadioPress
                          : styles.buttonRadio
                      }>
                      <Text style={styles.RadioButtonTextStyle}>Others</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  this.handleSubmitButton();
                }}>
                <Text style={styles.buttonTextStyle}>Book An Appointment</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
export default UserInfo;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    //fontFamily: 'Nunito-SemiBold',
    marginTop: -77,
    //height: 'fit-content',
    color: "#FFF",
  },
  SectionStyle: {
    height: 40,
    marginTop: 18,
    flexDirection: "row",
  },
  PSectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 14,
    marginLeft: 13,
    marginRight: 35,
    margin: 10,
  },
  TextSectionStyle: {
    //fontFamily: 'Nunito-SemiBold',
    marginLeft: 15,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonRadio: {
    height: 50,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    //boxSizing: "borderBox",
    //fontFamily: 'Nunito',
    //boxShadow: '0 2px 5px 0 hsl(0deg 0% 82% / 50%)',
    borderRadius: 4,
    padding: 6,
    //border: 'none',
    fontSize: 11,
    textAlign: "center",
    justifyContent: "center",
    //border: '1px solid #e5e5eb',
    marginRight: 12,
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonRadioPress: {
    height: 50,
    alignItems: "center",
    borderStyle: "solid",
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito',
    //boxShadow: '0 2px 5px 0 hsl(0deg 0% 82% / 50%)',
    borderRadius: 4,
    padding: 6,
    //border: 'none',
    fontSize: 11,
    textAlign: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#7DE24E",
    // border: "1px solid #7DE24E",
    marginRight: 12,
    paddingRight: 15,
    paddingLeft: 15,
  },
  genderRadio: {
    ///boxShadow: '0 0 15px rgba(24,24,24,.161)',
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginRight: 30,
    width: 90,
  },
  genderRadioPress: {
    //boxShadow: '0 0 15px rgba(24,24,24,.161)',
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginRight: 30,
    width: 90,
  },
  RadioButtonTextStyle: {
    color: "black",
    paddingVertical: 10,
    fontSize: 13,
    //fontFamily: 'Nunito'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    //fontFamily: 'Nunito'
  },
  inputStyle: {
    borderStyle: "solid",
    borderWidth: 1,
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito-Light',
    //boxShadow: 'rgb(224 224 224) 0px 0px 6px 0px',
    borderRadius: 4,
    padding: 6,
    //border: "none",
    fontSize: 11,
    height: 40,
  },
  inputAgeStyle: {
    borderStyle: "solid",
    borderWidth: 1,
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgb(255, 255, 255)",
    //boxSizing: 'borderBox',
    //fontFamily: 'Nunito-Light',
    //boxShadow: 'rgb(224 224 224) 0px 0px 6px 0px',
    borderRadius: 4,
    padding: 6,
    //border: 'none',
    fontSize: 11,
    height: 40,
    width: 70,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    //backdropFilter: "brightness(0.5)",
  },
  modalView: {
    backgroundColor: "white",
    paddingTop: 100,
    paddingBottom: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    right: 13,
    top: 16,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
