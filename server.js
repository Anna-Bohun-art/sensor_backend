const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Sensor, User } = require("./schemas/model.js");
const connectDB = require("./dbinit");
const sensorRoutes = require("./routes/SensorRoutes");
const userRoutes = require("./routes/UserRoutes");
//const { requireAuth, checkUser } = require("./middleware/requireAuth.js");
const { username } = require("./controllers/userControllers.js");
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
app.use((req, res, next)=>{
    const allowedOrigins = ['http://localhost:8080'/*, 'http://gamebrag.onrender.com', 'https://gamebrag.onrender.com'*/];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
      next();
})
//app.get('*', checkUser);
//app.get('/signup', requireAuth, (req, res) => res.render('user'));
app.get("/", (req, res)=> {
    res.json("Welcome to sensor API");
})
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})

