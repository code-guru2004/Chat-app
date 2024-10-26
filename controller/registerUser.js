const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(req,res) {
    try {
        const {name , email , password , profile_pic} = req.body;

        const check_exist_user  = await UserModel.findOne({email});

        if(check_exist_user){
            return res.status(400).json({
                message: "User Already Exist",
                error: true,
            })
        }
        
        // password ---> hashed form
        const salt  = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);

        const payload = {
            name,
            email,
            profile_pic,
            password : hashedPassword
        }

        const user = new UserModel(payload);
        const userData = await user.save();

        return res.status(201).json({
            message: "User Register Successfully",
            data : userData,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = registerUser ;