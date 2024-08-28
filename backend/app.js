const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv").config();

const router = require("./routes");

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("Database not connected",err);
})

app.use(express.json());
app.use(cors())
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log("Server Connected to PORT = ",process.env.PORT)
})
