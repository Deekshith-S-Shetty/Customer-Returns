const express = require("express");
const router = new express.Router();
const User = require("../Firebase/firebase.js");

// home

console.log(User);
router.get("/", (req,res)=>{
    res.send("Hello world");
});

// Login User

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
  
    if (!email || !password) {
      res.status(422).json({ error: "Fill all the feild" });
    }
});

module.exports = router;