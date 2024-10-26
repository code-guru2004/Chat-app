const UserModel = require("../models/UserModel");



async function checkEmail(req,res) {
    try {
        const {email} = req.body;

        const user = await UserModel.findOne({email}).select("-password")

        if(!user){
            return res.status(404).json({
                message: "User Email does not Exist",
                error: true
            })
        }

        return res.status(200).json({
            message: "User Email exists",
            data : user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = checkEmail ;