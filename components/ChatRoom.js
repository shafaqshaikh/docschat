import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableRipple, Surface } from "react-native-paper";

const width = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

export function ChatRoom({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [height, setHeight] = useState();
  const [text, setText] = useState([]);
  const [uid, setUid] = useState(null);
  const clearTextInput = useRef(null);

  AsyncStorage.getItem("uid").then((result) => {
    if (result != null) {
      setUid(result);
    } else if (result == null) {
      navigation.navigate("Home");
    }
  });

  const db = firebase.firestore();

  var doc = db
    .collection("NUMBERS")
    .doc(route.params.docID)
    .get()
    .then((docRef) => {
      if (docRef.data().docPresent == true) {
        navigation.setOptions({
          headerTitle: (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile", {
                  name: docRef.data().doctorName,
                  image: docRef.data().doctorImage,
                  about: docRef.data().doctorAbout,
                });
              }}
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  borderRadius: 66,
                  height: 45,
                  width: 44,
                  marginRight: 13,
                  marginTop: 4,
                }}
                source={require("../assets/therapist.jpg")}
                source={docRef.data().doctorImage}></Image>
              <Text>{docRef.data().doctorName}</Text>
            </TouchableOpacity>
          ),
        });
      }
    });

  async function matchTherapist() {
    var citiesRef = db.collection("DOCTORS");
    var query = citiesRef
      .where("department", "==", "1")
      .orderBy("time")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("NUMBERS").doc(route.params.docID).set(
            {
              doctorName: doc.data().name,
              doctorImage: doc.data().image,
              doctorAbout: doc.data().about,
              docPresent: true,
            },
            { merge: true }
          );
          navigation.setOptions({
            headerTitle: (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", {
                    name: doc.data().name,
                    image: doc.data().image,
                    about: doc.data().about,
                  });
                }}
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    borderRadius: 66,
                    height: 45,
                    width: 44,
                    marginRight: 13,
                    marginTop: 4,
                  }}
                  source={doc.data().image}></Image>
                <Text>{doc.data().name}</Text>
              </TouchableOpacity>
            ),
          });
          db.collection("NUMBERS")
            .doc(route.params.docID)
            .collection("MESSAGES")
            .add({
              text: doc.data().message,
              createdAt: new Date().getTime(),
              user: {
                _id: doc.data().id,
                name: doc.data().name,
              },
            })
            .then((doc) => {
              setTimeout(() => {
                db.collection("NUMBERS")
                  .doc(route.params.docID)
                  .collection("MESSAGES")
                  .add({
                    text: "text",
                    createdAt: new Date().getTime(),
                    isPlan: true,
                    user: {
                      _id: 1,
                      name: "HappySpace",
                    },
                  });
              }, 1400);
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  async function handleSend(newMessage = []) {
    const text = newMessage[0].text;

    //  setMessages(messages.push(...newMessage));
    db.collection("NUMBERS")
      .doc(route.params.docID)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: uid,
          name: route.params.name,
        },
      });
  }

  async function handleQuick(newMessage = []) {
    let value = newMessage[0].value;

    if (value == "First") {
      db.collection("NUMBERS")
        .doc(route.params.docID)
        .collection("MESSAGES")
        .add({
          text: "Do you have any other health problem?  " + newMessage[0].title,
          createdAt: new Date().getTime(),
          user: {
            _id: uid,
            name: route.params.name,
          },
        })
        .then((docRef) => {
          setTimeout(() => {
            db.collection("NUMBERS")
              .doc(route.params.docID)
              .collection("MESSAGES")
              .add({
                text: "Are you on any medication?",
                createdAt: new Date().getTime(),
                quickReplies: {
                  type: "radio", // or 'checkbox',
                  keepIt: true,
                  values: [
                    {
                      title: "Yes",
                      value: "Second",
                    },
                    {
                      title: "No",
                      value: "Second",
                    },
                  ],
                },
                user: {
                  _id: 1,
                  name: "Assistant",
                },
              });
          }, 1400);
        });
    }

    if (value == "Second") {
      db.collection("NUMBERS")
        .doc(route.params.docID)
        .collection("MESSAGES")
        .add({
          text: "Are you on any medication?  " + newMessage[0].title,
          createdAt: new Date().getTime(),
          user: {
            _id: uid,
            name: route.params.name,
          },
        })
        .then((docRef) => {
          setTimeout(() => {
            db.collection("NUMBERS")
              .doc(route.params.docID)
              .collection("MESSAGES")
              .add({
                text: "Have you consulted for the condition previously?",
                createdAt: new Date().getTime(),
                quickReplies: {
                  type: "radio", // or 'checkbox',
                  keepIt: true,
                  values: [
                    {
                      title: "Yes",
                      value: "Third",
                    },
                    {
                      title: "No",
                      value: "Third",
                    },
                  ],
                },
                user: {
                  _id: 1,
                  name: "Assistant",
                },
              });
          }, 1400);
        });
    }

    if (value == "Third") {
      db.collection("NUMBERS")
        .doc(route.params.docID)
        .collection("MESSAGES")
        .add({
          text:
            "Have you consulted for the condition previously?  " +
            newMessage[0].title,
          createdAt: new Date().getTime(),
          user: {
            _id: uid,
            name: route.params.name,
          },
        })
        .then((docRef) => {
          setTimeout(() => {
            db.collection("NUMBERS")
              .doc(route.params.docID)
              .collection("MESSAGES")
              .add({
                text: "text",
                createdAt: new Date().getTime(),
                isOptions: true,
                user: {
                  _id: 1,
                  name: "Assistant",
                },
              });
          }, 1400);
        });
    }

    if (value == "Fourth") {
      db.collection("NUMBERS")
        .doc(route.params.docID)
        .collection("MESSAGES")
        .add({
          text:
            "Since when are you facing this condition?  " + newMessage[0].title,
          createdAt: new Date().getTime(),
          user: {
            _id: uid,
            name: route.params.name,
          },
        })
        .then((docRef) => {
          matchTherapist();
        });
    }
  }

  useEffect(() => {
    const messagesListener = db
      .collection("NUMBERS")
      .doc(route.params.docID)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  const Item = ({ item }) => {
    var date = new Date(item.createdAt);
    var str = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (item.isPlan) {
      return (
        <View>
          <View
            style={{
              padding: 20,
              paddingLeft: 12,
              alignItems: "center",
              width: width,
            }}>
            <View style={styles.border}>
              <Text style={styles.namePlan}>{item.user.name}</Text>
              <View style={styles.para}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    letterSpacing: 0.2,
                    color: "rgb(34, 47, 45)",
                  }}>
                  With Messaging Therapy™ you can message your personal licensed
                  therapist anytime, anywhere. Start improving your life today.
                </Text>
              </View>
              <View>
                <TouchableRipple
                  rippleColor="#486939"
                  style={styles.buttonStylePlan}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("Therapy Plan");
                  }}>
                  <Text style={styles.buttonTextStylePlan}>
                    Choose Your Plan
                  </Text>
                </TouchableRipple>
              </View>
              <Text style={styles.namePlan}>{str}</Text>
            </View>
          </View>
        </View>
      );
    }

    if (item.isOptions) {
      var period;
      return (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          {/* <Text style={styles.name}>{item.user.name}</Text> */}
          <View
            style={{
              width: width * 0.65,
              padding: 14,
              paddingBottom: 9,
              backgroundColor: "rgb(239, 243, 250)",
              marginLeft: 15,
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: "#222f2d",
                margin: 0,
                lineHeight: 22,
                fontSize: 16,
                letterSpacing: 0.2,
              }}>
              Since when are you facing this condition?
            </Text>
            <View style={{ marginTop: 10, flex: 1, flexDirection: "row" }}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(val) => (period = val)}
                placeholder="Enter time period"
                keyboardType="numeric"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                blurOnSubmit={false}
              />

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  handleQuick([
                    {
                      value: "Fourth",
                      title: period,
                    },
                  ]);
                }}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timeInput}>{str}</Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        {item && item.user.name && item.user.name == route.params.name && (
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.itemRight}>
              <Text style={styles.textRight}>{item.text}</Text>
              <Text style={styles.timeRight}>{str}</Text>
            </View>
          </View>
        )}

        {item &&
          item.user.name &&
          item.user.name != route.params.name &&
          !item.quickReplies && (
            <View>
              <View style={styles.itemLeft}>
                <Text style={styles.textLeft}>{item.text}</Text>
                <Text style={styles.timeLeft}>{str}</Text>
              </View>
            </View>
          )}

        {item && item.quickReplies && item.quickReplies.type == "radio" && (
          <View>
            <View style={[styles.itemLeft, { marginBottom: 0 }]}>
              <Text style={styles.textLeft}>{item.text}</Text>
              <Text style={styles.timeLeft}>{str}</Text>
            </View>
            <View style={{ padding: 10, paddingTop: 0 }}>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 8 }}>
                <TouchableRipple
                  rippleColor="white"
                  onPress={() => {
                    handleQuick([
                      {
                        value: item.quickReplies.values[0].value,
                        title: "Yes",
                      },
                    ]);
                  }}>
                  <Text style={styles.quickReplies}>Yes</Text>
                </TouchableRipple>

                <TouchableRipple
                  rippleColor="white"
                  onPress={() => {
                    handleQuick([
                      { value: item.quickReplies.values[1].value, title: "No" },
                    ]);
                  }}>
                  <Text style={styles.quickReplies}>No</Text>
                </TouchableRipple>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={height}
      style={{ flex: 1, backgroundColor: "white", height: 50 }}>
      <View style={{ flex: 1, overflow: "scroll" }}>
        <FlatList
          inverted
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          extraData={messages}
        />
      </View>

      <View
        style={{
          height: 52,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 10,
        }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={[{ flex: 1, flexDirection: "row" }, styles.sendText]}>
            <View style={{ flex: 0.8 }}>
              <TextInput
                onChangeText={(val) => {
                  setText(val);
                }}
                style={{
                  height: height,
                  outline: "none",
                  marginLeft: 15,
                  marginTop: 12,
                  marginBottom: 12,
                }}
                placeholder="Type a message...."
                placeholderTextColor="#8b9cb5"
                multiline
                // onLayout={(event) => {
                //   if (textInputHeight === 0) {
                //     setTextInputHeight(event.nativeEvent.layout.height);
                //   }
                // }}
                ref={clearTextInput}
                scrollEnabled={false}
                onContentSizeChange={(e) =>
                  setHeight(e.nativeEvent.contentSize.height)
                }
              />
            </View>

            <View
              style={{
                flex: 0.2,
                alignItems: "flex-end",
              }}>
              <TouchableRipple
                rippleColor="white"
                activeOpacity={0.5}
                onPress={() => {
                  if (text.length == 0) {
                    return;
                  }
                  clearTextInput.current?.clear();
                  handleSend([
                    {
                      _id: "123",
                      text,
                      createdAt: new Date().getTime(),
                      user: {
                        _id: uid,
                        name: route.params.name,
                      },
                    },
                  ]);
                }}>
                <Image
                  style={{ height: 55, width: 55 }}
                  source={require("../assets/send.png")}></Image>
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemRight: {
    backgroundColor: "#0fc1a7",
    padding: 14,
    paddingBottom: 9,
    margin: 10,
    marginRight: 15,
    borderRadius: 20,
    maxWidth: width * 0.65,
  },
  textRight: {
    color: "white",
    margin: 0,
    lineHeight: 22,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  timeRight: {
    //textAlign: 'end',
    paddingTop: 5,
    fontSize: 13,
    color: "#326158",
  },
  timeInput: {
    //textAlign: 'end',
    paddingTop: 5,
    fontSize: 13,
    color: "#326158",
  },
  itemLeft: {
    backgroundColor: "#eff3fa",
    padding: 14,
    paddingBottom: 9,
    margin: 10,
    marginLeft: 15,
    borderRadius: 20,
    maxWidth: width * 0.65,
  },
  textLeft: {
    color: "black",
    margin: 0,
    lineHeight: 22,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  timeLeft: {
    //textAlign: 'end',
    paddingTop: 5,
    fontSize: 13,
    color: "#326158",
  },
  quickReplies: {
    paddingTop: 5,
    paddingRight: 14,
    paddingBottom: 5,
    paddingLeft: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#3498db",
    color: "#3498db",
    marginLeft: 15,
    borderRadius: 20,
    fontSize: 13,
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
    //border: 'none',
    fontSize: 11,
    height: 33,
    width: width * 0.3,
  },
  buttonStyle: {
    borderStyle: "solid",
    borderColor: "rgb(52, 152, 219)",
    borderWidth: 1,
    color: "#FFFFFF",
    height: 30,
    alignItems: "center",
    borderRadius: 4,
    marginLeft: 13,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
  },
  buttonTextStyle: {
    fontSize: 13,
    borderRadius: 15,
    color: "rgb(52, 152, 219)",
  },
  name: {
    color: "rgb(152, 166, 178)",
    margin: 2,
    marginLeft: 21,
    fontSize: 13,
    //fontFamily: 'monospace',
    marginBottom: 0,
  },
  namePlan: {
    color: "rgb(152, 166, 178)",
    margin: 2,
    fontSize: 13,
    //fontFamily: 'monospace'
  },
  nameRight: {
    color: "rgb(152, 166, 178)",
    margin: 2,
    marginRight: 21,
    fontSize: 13,
    //fontFamily: 'monospace',
    textAlign: "right",
  },
  para: {
    padding: 10,
    textAlign: "center",
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 10,
  },
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#e5e5eb",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonStylePlan: {
    backgroundColor: "rgb(125, 226, 78)",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 15,
    marginTop: 10,
    letterSpacing: 0.3,
  },
  buttonTextStylePlan: {
    color: "#FFFFFF",
    fontSize: 16,
    //fontFamily: "Nunito",
  },
  sendText: {
    //borderType: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
  },
});
