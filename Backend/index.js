const express = require('express');
const router = require('./Routes/router');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000,(req,res)=>{
    console.log("server started");
});