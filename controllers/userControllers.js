const { User } = require("../schemas/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "1d"});
};
//login the user
const loginUser = async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token })
    }  catch(error){
        res.status(400).json({ error: error.message });
    }
};
//sign up the user
const signupUser = async (req, res) => {
    const { username, email, password }= req.body;
    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.status(201).json({ email, token })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}
module.exports = {loginUser, signupUser}