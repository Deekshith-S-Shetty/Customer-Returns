const express = require("express");
const router = new express.Router();
const admin = require("../Firebase/firebase");

const db = admin.firestore();

// Home page rederer

router.get("/", (req, res) => {
  res.send("Hello Wellcome");
});

// Register user

router.post("/register", async (req, res) => {
  const userData = {
    email:req.body.email,
    name:req.body.name
  }

  try {
    const userDoc = await db.collection("Users").doc(userData.email).set(userData);

    res.json(userDoc);

  } catch (error) {
    res.status(400).json(error);
  }
});

// Login User

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Fill all the fields" });
  }

 
});

module.exports = router;
