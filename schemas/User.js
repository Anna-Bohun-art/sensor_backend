const mongoose= require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
    if(!username || !email || !password ){
        throw Error("All fields must be filled");
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
    const hash = await bcrypt.hash(password.salt);
    const user = await this.create({ username, email, password: hash });
    return user;
}
userSchema.statistics.login = async function(email, password){
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
module.exports = mongoose.model("User", userSchema)