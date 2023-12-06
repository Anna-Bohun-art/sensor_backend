const { User } = require("../schemas/model");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const createToken = (_id, username)=> {
    return jwt.sign({_id, username}, process.env.SECRET, {expiresIn: "1d"});
};


//sign up the user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id, username);
        res.status(200).json({ username, email, password });
    } catch(error){
        res.status(400).json({error: error.message});
    }
}
//login user
const loginUser = async(req, res)=> {
   
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        console.log("user", user);
        const token = createToken(user._id, user.username);
        const currentUser = user.username;
        res.status(200).json({ email, token, currentUser });
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
};
const getCurrentUser = async(token) => {
    const currentUser = jwt.decode(token, process.env.SECRET);
    return currentUser;
}

module.exports = { loginUser, signupUser, getCurrentUser }