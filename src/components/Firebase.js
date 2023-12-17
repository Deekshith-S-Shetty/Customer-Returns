import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "customerreturn-97bdd.firebaseapp.com",
  databaseURL: "https://customerreturn-97bdd-default-rtdb.firebaseio.com",
  projectId: "customerreturn-97bdd",
  storageBucket: "customerreturn-97bdd.appspot.com",
  messagingSenderId: "445643170054",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-KSN3HTKNT4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
