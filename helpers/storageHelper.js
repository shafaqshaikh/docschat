import AsyncStorage from "@react-native-community/async-storage";

//now lets create a method that checks if the user is logged in anytime
export const isSignedIn = AsyncStorage.getItem('user')
.then((res) => {
  return res
})