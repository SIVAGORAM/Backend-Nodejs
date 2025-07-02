const express = require('express');
const connectDB = require("../config/database"); // import the function
const User = require("../models/user");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// POST /signup - Create new user
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// GET /user - Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// GET /feed - Get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});


// Get Delete user by ID
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// patch upadte user by ID
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id:userId },data);
        res.send("User updated successfully");
    }
    catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});
    

// Connect DB and start server
connectDB()
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        app.listen(3000, () => {
            console.log("🚀 Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
    });
