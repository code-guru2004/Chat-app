const getUserDeatils = require("../helpers/getUserDeatilsFromTokens");

async function userDeatails(req,res) {
    try {
        const token = req.cookies.token ||"";

        const user = await getUserDeatils(token);

        return res.status(201).json({
            message: "User data fetch successfully",
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = userDeatails;