const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 6001;

//Initialize user's input
let userNotes = [];
// parsing
app.use(express.json());
// static
app.use(express.urlencoded({ extended: true }));
// middleware
app.use(express.static(path.join(__dirname, "Develop/public")));



// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
});