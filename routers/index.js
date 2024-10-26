const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDeatails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUser = require("../controller/updateUser");
const searchUser = require("../controller/searchUser");

const router = express.Router();


// Sign up
router.post("/register" , registerUser);

// for Log in

// step -1 validating email

router.post("/email" , checkEmail);


// step-2 validate password

router.post("/password", checkPassword);

//getting user data
router.get("/user" , userDeatails);

//logout
router.post("/logout" , logout);

//update
router.post("/update-user", updateUser);


// search user
router.post("/search-user" , searchUser);


module.exports = router