const express = require("express");
const {Server} = require("socket.io")
const  http  = require("http")
const getUserDeatils = require("../helpers/getUserDeatilsFromTokens");
const UserModel = require("../models/UserModel");

const app = express();

/*  socket connection  */


const server = http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : process.env.FRONTEND_URL,
        credentials : true
    }
})


// check user online or not 

const onlineUser = new Set()

io.on('connection' , async (socket)=>{

    console.log(('connected user' , socket.id));
    
    const token = socket.handshake.auth.token

    //console.log(token);
    const user = await getUserDeatils(token)

    //console.log("User" ,user);
    
    socket.join(user?._id);

    onlineUser.add(user?._id?.toString());

    io.emit("onlineUser" , Array.from(onlineUser))

    socket.on('message-page' , async (userId)=>{
        //console.log("uuser id",userId);
        const userDetails =  await UserModel.findById(userId).select("-password")
        //console.log(userDetails);
        const payload = {
            _id : userDetails?._id,
            name : userDetails?.name,
            email : userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online : onlineUser.has(userId)  //boolean
        }

        socket.emit('message-page' ,payload)
    })

    // disconnect
    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id)
        console.log('Disconnect' , socket.id);
        
    })
})


module.exports = {
    app,
    server
}