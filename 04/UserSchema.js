const mongoose = require('mongoose');
const validator = require('validator'); // Importing validator for email validation 
const userSchema = new mongoose.Schema({
    firstName:{
        type :String,
        required: true,
        minlength: 4, // Minimum length for first name
        maxlength: 50, // Maximum length for first name
    },
    lastName:{
        type :String
    },
    emailId:{
        type :String,
        required: true,
        unique: true, // Ensure emailId is unique
        lowercase: true, // Convert email to lowercase
        trim: true, // Remove leading and trailing spaces
        validate(value) { // Custom validation for email format
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid"+ value);
            }
        },
    },
    password:{
        type :String,
        required: true,
        validate(value) { // Custom validation for password strength
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough"+value);
            }
        }
    },
    age:{
        type: Number,
        min:18, // Minimum age requirement
        max:50, // Maximum age limit
        required: true, // Age is required
    },
    gender:{
        type: String,
        validate(value) { // Custom validation this is only works for new object creation
            if(!["male",'female','other'].includes(value)) {
                throw new Error("Gender data us not valid");
            }
        }
    },
    photourl:{
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png", // Default avatar URL 
        validate(value) { // Custom validation for URL format
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid");
            }
        }   
    },
    about:{
        type: String,
        default: "this is Default about user", // Default value if not provided
    },
    skills:{
        type: [String], // Array of strings for skills
    },

}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});


// creating User model

module.exports = mongoose.model("User",userSchema );
