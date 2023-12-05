const express = require("express");

const {
    getAllSensors,
    getOneSensor,
    postOneSensor
} = require("../controllers/sensorControllers");
const requireAuth = require("../middleware/requireAuth");


const app = express.Router();
app.use(requireAuth);
app.route("/").get(getAllSensors).post(postOneSensor);
app.route("/:id").get(getOneSensor);

module.exports = app;