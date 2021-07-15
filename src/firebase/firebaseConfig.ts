import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyDocGK8IMu7lwiOfSDzUUyXjb38-tXA0Bg",
    authDomain: "search-health-ce2ca.firebaseapp.com",
    databaseURL: "https://search-health-ce2ca-default-rtdb.firebaseio.com",
    projectId: "search-health-ce2ca",
    storageBucket: "search-health-ce2ca.appspot.com",
    messagingSenderId: "29329690868",
    appId: "1:29329690868:web:96892ea2165b3ac3e6cea1"
}
firebase.initializeApp(config)

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();