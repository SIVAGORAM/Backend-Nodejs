const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sivagoram:Siva%402003@sivagoramcluster.ps3lpxs.mongodb.net/DevProject");
};

module.exports = connectDB; // export the function
