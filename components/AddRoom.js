import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { IconButton, Title } from "react-native-paper";
import firebase from "firebase";

const { width, height } = Dimensions.get("screen");

export function AddRoomScreen({ navigation }) {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBU4StvIWMDTwuTR_PqQ73oyGQYgh5cP-k",
    authDomain: "medikaids-649e1.firebaseapp.com",
    projectId: "medikaids-649e1",
    storageBucket: "medikaids-649e1.appspot.com",
    messagingSenderId: "1034398649876",
    appId: "1:1034398649876:web:f67166b6f18ce794ca2101",
    measurementId: "G-7M12K200JR",
  };

  try {
    if (FIREBASE_CONFIG.apiKey) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  } catch (err) {
    // ignore app already initialized error on snack
  }

  const db = firebase.firestore();
  const [roomName, setRoomName] = useState("");
  // ... Firestore query will come here later

  function handleButtonPress() {
    if (roomName.length > 0) {
      db.collection("THREADS")
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection("MESSAGES").add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate("Home");
        });
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <TextInput
          style={{ borderStyle: "solid", borderWidth: 1, height: 40 }}
          labelName="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
        />
        <TouchableOpacity
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            padding: 10,
            backgroundColor: "blue",
            height: 40,
          }}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        >
          Create
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});
