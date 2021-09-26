import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { SocialIcon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
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

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const [recaptchaHide, setRecaptchaHide] = React.useState(true);
  const [otpHide, setOtpHide] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await AsyncStorage.setItem("user", user.uid);
          navigation.navigate("Home");
        } catch (error) {}
      } else {
        console.log("user");
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Enter phone number</Text>
        <TextInput
          style={styles.textInput}
          autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="+91 7892951234"
          editable={!verificationId}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />

        <Button
          title={`${verificationId ? "Resend" : "Send"} Verification Code`}
          disabled={!phoneNumber}
          onPress={async () => {
            const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId("");
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptcha
              );
              setVerifyInProgress(false);
              setRecaptchaHide(false);
              setVerificationId(verificationId);
              setOtpHide(true);
              verificationCodeTextInput.current?.focus();
            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}
        />

        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
        {/* {verifyInProgress && <ActivityIndicator style={styles.loader} />} */}
        {recaptchaHide && (
          <View style={{ marginTop: 10 }} nativeID="recaptcha"></View>
        )}
        {verificationId ? (
          <Text style={styles.success}>
            A verification code has been sent to your phone
          </Text>
        ) : undefined}
        {otpHide && (
          <View>
            <Text style={styles.text}>Enter verification code</Text>
            <TextInput
              ref={verificationCodeTextInput}
              style={styles.textInput}
              editable={!!verificationId}
              placeholder="123456"
              onChangeText={(verificationCode) =>
                setVerificationCode(verificationCode)
              }
            />
            <Button
              title="Confirm Verification Code"
              disabled={!verificationCode}
              onPress={async () => {
                try {
                  setConfirmError(undefined);
                  setConfirmInProgress(true);
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                  );
                  const authResult = await firebase
                    .auth()
                    .signInWithCredential(credential);
                  // console.log(authResult)
                  setConfirmInProgress(false);
                  setVerificationId("");
                  setVerificationCode("");
                  verificationCodeTextInput.current?.clear();
                  Alert.alert("Phone authentication successful!");
                } catch (err) {
                  setConfirmError(err);
                  setConfirmInProgress(false);
                }
              }}
            />
          </View>
        )}
      </View>

      <SocialIcon
        onPress={() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
          firebase
            .auth()
            .getRedirectResult()
            .then((result) => {
              AsyncStorage.setItem("user", result.user);
              console.log(result);
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;

              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = credential.accessToken;
              // The signed-in user info.
              var user = result.userr;
              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        }}
        title="Sign In With Google"
        button
        type="google"
      />

      <SocialIcon
        onPress={() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase
            .auth()
            .signInWithRedirect(provider)
            .then((result) => {
              // console.log(result)
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;

              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              // console.log(user.uid)
              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        }}
        title="Sign In With Facebook"
        button
        type="facebook"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginBottom: 30,
    padding: 12,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 10,
    //fontFamily: 'Nunito'
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});
