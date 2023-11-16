const mongoose = require("mongoose");
const { Schema } = mongoose;

const sensorSchema = new Schema({
    sensor_id:{
        type:String,
        required: true
        
    },
    temperature:{
        type:Number,
        required: true
    },
    humidity:{
        type:Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    created_at:{
        type:String,
        required: true
    }
})
module.exports = mongoose.model("Sensor", sensorSchema);