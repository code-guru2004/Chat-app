const mongoose = require("mongoose");

async function connectDB() {
    try {
        
            await mongoose.connect(process.env.MONGODB_URL);

            const connection = mongoose.connection

            connection.on('connected',()=>{
                console.log("Connected to DB");
                
            })

            connection.on('error',(error)=>{
                    console.log("Something Is wrong in DB :: " , error);
                    
            })

    } catch (error) {
        console.log("ERROR FOUND :: IN DATABASE CONNECTION ::",error);
        
    }
}

module.exports = connectDB