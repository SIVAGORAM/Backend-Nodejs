// const express = require('express');

// const app = express();

// // app.use("/test", (req, res) => {
// //     res.send("hello From Test Route");
// // });

// // app.use("/Hello", (req, res) => {
// //     res.send("hello From Hello Route");
// // });


// // Because Order of Middleware Matters
// // app.use("/user", (req, res)=> {
// //     res.send("Hello hello Hello");
// // });

// // app.get("/user",(req,res) => {
// //     res.send({"firstName":"Siva",lastname:"Goram"});
// // }); 

// // app.post("/user", (req, res) => {
// //     //saving data to DB
// //     res.send("Data successfully saved to the Database");
// // });

// // app.delete("/user", (req, res) => {
// //     res.send("Deleted Successfully  ");
// // }); 

// // // This should come last to act as a fallback
// // app.use((req, res) => {
// //     res.send("hello From Server");
// // }); 


// // it work for /ac , /abc 
// app.get("/ab?c",(req,res) => {
//     res.send({"firstName":"Siva",lastname:"Goram"});
// }); 


// // app.get("/ab+c",(req,res) => {
// //     res.send({"firstName":"Siva",lastname:"Goram"});
// // }); 

// // // it work for /ac , /abc , /abbbc
// // app.get("/ab*c",(req,res) => {
// //     res.send({"firstName":"Siva",lastname:"Goram"});
// // }); 


// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });


const express = require('express');

const app = express();

// Basic middleware routes
app.use("/test", (req, res) => {
    res.send("hello From Test Route");
});

app.use("/Hello", (req, res) => {
    res.send("hello From Hello Route");
});

// Middleware order matters
app.use("/user", (req, res) => {
    res.send("Hello hello Hello");
});

// GET /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Siva", lastname: "Goram" });
});

// POST /user
app.post("/user", (req, res) => {
    // Simulate saving to DB
    res.send("Data successfully saved to the Database");
});

// DELETE /user
app.delete("/user", (req, res) => {
    res.send("Deleted Successfully");
});

// Route patterns using regex for compatibility

// Matches /ac and /abc
app.get(/^\/ab?c$/, (req, res) => {
    res.send({ firstName: "Siva", lastname: "Goram" });
});

// Matches /abc, /abbc, /abbbc, etc.
app.get(/^\/ab+c$/, (req, res) => {
    res.send({ firstName: "Siva", lastname: "Goram" });
});

// Matches /ac, /abc, /abXYc, etc.
app.get(/^\/ab*c$/, (req, res) => {
    res.send({ firstName: "Siva", lastname: "Goram" });
});

// Fallback route for unmatched paths
app.use((req, res) => {
    res.send("hello From Server");
});


app.get("/users/:userId/:name/:password",(req,res) => {
    console.log(req.params);
res.send({firstName: "Siva", lastname: "Goram"});
}); 
// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
