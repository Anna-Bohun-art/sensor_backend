const express = require("express");
const app = express.Router();
const {
    getAllSensors,
    getOneSensor,
    postOneSensor
} = require("../controllers/sensorControllers");

app.route("/").get(getAllSensors).post(postOneSensor);
app.route("/:id").get(getOneSensor);

module.exports = app;