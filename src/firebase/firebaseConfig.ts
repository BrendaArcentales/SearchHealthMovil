import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "Your-key",
  authDomain: "Your-key",
  databaseURL: "Your-key",
  projectId: "Your-key",
  storageBucket: "Your-key",
  messagingSenderId: "Your-key",
  appId: "Your-key",
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
