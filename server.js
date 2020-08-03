const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 001;

//Initialize user's input
let userNotes = [];
// parsing
app.use(express.json());
// static
app.use(express.urlencoded({ extended: true }));
// middleware
app.use(express.static(path.join(__dirname, "Develop/public")));

// call response for all notes. Sends array of obj to the browser
app.get("/api/notes", function(err, res) {
    try {
      userNotes = fs.readFileSync("Develop/db/db.json", "utf8");
      console.log("welcome");
      userNotes = JSON.parse(userNotes);
  
      //error handling
    } catch (err) {
      console.log("\n error (in app.get.catch):");
      console.log(err);
    }
    //   send objects to the browser
    res.json(userNotes);
});




// Web page when the Get started button is clicked
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
  });

// If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
  });
  

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
  });

// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
});