const getUserDeatils = require("../helpers/getUserDeatilsFromTokens");
const UserModel = require("../models/UserModel");

async function updateUser(req,res) {
    try {
        console.log(req.body);
        
        const {name , profile_pic}  = req.body;

        const token = req.cookies.token || "";
        const user = await getUserDeatils(token);

        const tempUpdateUser = await UserModel.findByIdAndUpdate({_id:user._id},{
            name: name,
            profile_pic: profile_pic
        });
        console.log(tempUpdateUser);
        
        const updatedUser = await UserModel.findById(user._id)
        console.log(updateUser);
        return res.status(201).json({
            message: "User Updated successfully",
            success: true,
            data: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "error",
            error: true
        })
    }
}

module.exports = updateUser;