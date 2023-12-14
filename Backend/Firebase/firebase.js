var admin = require("firebase-admin");

var serviceAccount = require("../Firebase/serviceAccountKey.json");

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customerreturn-97bdd-default-rtdb.firebaseio.com"
};

admin.initializeApp(firebaseConfig);

  
module.exports = admin;