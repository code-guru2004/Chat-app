const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

async function getUserDeatils(token) {
    if(!token){
        return {
            message: "Session Out",
            logout: true,
            error: true
        }
    }

    const decodData = await jwt.verify(token , process.env.SECRET_KEY_JWT);

    const user = await UserModel.findById(decodData.id).select("-password");

    return user;
}

module.exports = getUserDeatils;