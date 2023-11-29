const { Sensor } = require("../schemas/model");

const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.header("Access-Control-Allow-Methods", "*");
        res.status(200).json({
          success: true,
          sensors,
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          error,
        });
    }
}
const getOneSensor = async (req, res)=> {
    try {
        const sensor = await Sensor.findById(req.params.id);
        res.header("Access-Control-Allow-Methods", "*");
        res.status(200).json({
          success: true,
          sensor,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error,
        });
      }
    }
    const postOneSensor = async (req, res) => {
      try{
        const  { sensor_id, temperature, humidity, location, created_at } = req.body;
        res.header("Access-Control-Allow-Methods", "*");
        console.log("req.body", req.body);
        console.log("sensor_id", sensor_id);
        const input = await Sensor.create({ sensor_id, temperature, humidity, location, created_at })
        res.status(201).json({message: "Data inserted successfully", insertedId: input.id});
      } catch(err){
        console.error("Sensor data can not be send to the Database...sorry", err.message);
        res.status(500).json({message: "Internal message error: ", error: err.message });
      }
    }

module.exports = {
    getAllSensors,
    getOneSensor,
    postOneSensor
  };