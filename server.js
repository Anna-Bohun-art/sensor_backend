const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {Sensor, User } = require("./schemas/model.js");
const connectDB = require("./dbinit");
const sensorRoutes = require("./routes/SensorRoutes");
const userRoutes = require("./routes/UserRoutes")
const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

//application json response
app.use(express.json());
const jwt = require("jsonwebtoken");
//middleware for cookies
app.use(cookieParser());
app.use(cors());
app.use("/sensor", sensorRoutes);
app.use("/user", userRoutes);
app.use(express.urlencoded({extended: true}));
app.get((req, res, next){
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get("/", (req, res)=> {
    res.json("Welcome to sensor API");
})
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})

