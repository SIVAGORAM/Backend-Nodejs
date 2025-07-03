const express = require('express');
const connectDB = require("../config/database");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const bcrycpt = require("bcrypt")

const app = express();

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ------------------ POST /signup ------------------
app.post("/signup", async (req, res) => {
    try {
        // ✅ Validation
        validateSignupData(req);

        const {firstName,lastName,emailId, age,password} = req.body;

        // encryption the password

        const passwordHash = await  bcrycpt.hash(password,10);
        console.log(passwordHash)

        // ✅ Create and save user
        const user = new User({
            firstName,
            lastName,
            emailId,
            age,
            password: passwordHash,
        });

        await user.save();

        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});


app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body; // ✅ FIXED: match field name with schema

        const user = await User.findOne({ emailId }); // ✅ FIXED: use 'emailId', not 'email'

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrycpt.compare(password, user.password);

        if (isPasswordValid) {
            res.send("Login Successful!!!");
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        res.status(400).send("Login failed: " + err.message); // ✅ FIXED: Proper error response
    }
});


// ------------------ GET /user (by email) ------------------
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// ------------------ GET /feed (all users) ------------------
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// ------------------ DELETE /user (by userId) ------------------
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) throw new Error("User not found");
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// ------------------ PATCH /user/:userId ------------------
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photourl", "about", "skills", "gender", "age"];
        const isUpdateAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));

        if (!isUpdateAllowed) throw new Error("Update not allowed");

        if (data.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators: true
        });

        if (!user) throw new Error("User not found");

        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Update failed: " + err.message);
    }
});

// ------------------ CONNECT DB & START SERVER ------------------
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
