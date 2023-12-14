import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEYS,
  authDomain: "customer-returns-529e9.firebaseapp.com",
  projectId: "customer-returns-529e9",
  storageBucket: "customer-returns-529e9.appspot.com",
  messagingSenderId: "1093546968736",
  appId: process.env.REACT_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
