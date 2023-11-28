const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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
}, {timestamps : true})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});
//create a static method
userSchema.statics.signup = async function(username, email, password){
    //check if email exists in DB
    const exists = await this.findOne({ email });
    if(exists) {
        throw Error("Email already in use");
    }
    if(!username){
        throw Error("Username can not be blank");
    }
    if(!email){
        throw Error("Email can not be blank");
    }
    if(!password){
        throw Error("Password can not be blank")
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Make sure to use at least 8 Characters, one Uppercase letter a number and a symbol");
    }
    //salt the password
    const salt = await bcrypt.genSalt(10);
    //hash the password
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ username, email, password: hash });
    return user;
}
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled");
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error("User does not exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Incorrect password");
    }
    return user;
}
const User = mongoose.model("user", userSchema);
const Sensor = mongoose.model("sensor", sensorSchema);

module.exports = {User, Sensor}
