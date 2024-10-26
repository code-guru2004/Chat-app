const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

async function checkPassword(req,res) {
    try {
        const {password , userId}  = req.body;

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: true
            })
        }
       
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if(!verifyPassword){
            return res.status(400).json({
                message: "Password not matched",
                error: true
            })
        }
 
        // make token
        const tokenPayload = {
            id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenPayload , process.env.SECRET_KEY_JWT, {expiresIn: '1d'});

        //create cookies
        const cookiesOption = {
            http: true,
            secure: true
        }

        return res.cookie('token' , token , cookiesOption).status(201).json({
            message: "Password is Correct :: Log in successfully",
            success: true,
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = checkPassword