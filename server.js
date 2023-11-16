const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./dbinit");
const sensorRoutes = require("./routes/SensorRoutes");
const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

//application json response
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
app.use("/sensor", sensorRoutes);
app.use(express.urlencoded({extended: true}));

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})
app.get("/", (req, res)=> {
    res.send("Welcome to sensor API");
})
/*a sensor will have:

id: uuid
temperature: number
humidity: number
location: string
created_at: date*/