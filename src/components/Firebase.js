import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, getDocs } from "firebase/firestore";

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

//Customer reference
const customerRef = collection(db, "customer");
const customerSnapshot = await getDocs(customerRef);
const customerArray = customerSnapshot.docs.map((doc) => doc.id);

//Manufacturer reference
const manufacturerRef = collection(db, "manufacturer");
const manufacturerSnapshot = await getDocs(manufacturerRef);
const manufacturerArray = manufacturerSnapshot.docs.map((doc) => doc.id);

//Delivery reference
// const deliveryRef = collection(db, "delivery");
// const deliverySnapshot = await getDocs(deliveryRef);
// const deliveryArray = deliverySnapshot.docs.map((doc) => ({
//   id: doc.id,
// }));

export {
  db,
  auth,
  customerArray,
  manufacturerArray,
};
