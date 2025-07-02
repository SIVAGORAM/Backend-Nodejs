const express = require('express');
const connectDB = require("../config/database"); // import the function

const app = express();
const User = require("../models/user");


app.post("/signup", async (req,res) =>{

    // Creating a new Instace of the User Model

    const user = new User({
        firstName:"Ravi",
        lastName:"Kumar",
        emailId:"ravi@gamil.com0",
        password:"ravi@2003",
    });

// Always use try-catch for async operations to handle errors gracefully
    try{
    await user.save();
    res.send("user Added Successfully");
    } catch(err){
        res.status(400).send("Error saving the user: " + err.message);      
    }
});

connectDB()
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
    });
