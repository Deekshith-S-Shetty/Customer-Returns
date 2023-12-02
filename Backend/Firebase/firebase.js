var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://customerreturn-97bdd-default-rtdb.firebaseio.com"
});

const database = firebase.database();

var User = database.ref("users");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

module.exports = User;

