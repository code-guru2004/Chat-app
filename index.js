const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const {app,server} = require("./socket/index.js")


// const app = express();



const connectDB = require("./config/connectDB");
const router = require("./routers/index.js");

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
})); 
app.use(express.json());
app.use(cookieParser()); 

const PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
    res.send("Home page");
}); 
  
//api end points

app.use('/api', router);

connectDB().then(()=>{
    server.listen(PORT , ()=>{
        console.log("Server is listening...");
    
    });
})


