const express = require("express");
const { loginUser, signupUser} = require("../controllers/userControllers");

const app = express.Router();
app.post("/login", loginUser);
app.post("/signup", signupUser);


module.exports = app;