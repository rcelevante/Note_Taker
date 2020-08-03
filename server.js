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

// writes the new note into json file
app.post("/api/notes", function(req, res) {
    try {
      userNotes = fs.readFileSync("./Develop/db/db.json", "utf8");
      console.log(userNotes);
  
      userNotes = JSON.parse(userNotes);
      //sets ID
      req.body.id = userNotes.length;
      userNotes.push(req.body); 
      // make it a string then write
      userNotes = JSON.stringify(userNotes);
      fs.writeFile("./Develop/db/db.json", userNotes, "utf8", function(err) {
        // throw an error handling
        if (err) throw err;
      });
    
      res.json(JSON.parse(userNotes));
  
    } catch (err) {
      throw err;
    }
  });

app.delete("/api/notes/:id", function(req, res) {
    try {
     
      userNotes = fs.readFileSync("./Develop/db/db.json", "utf8");
      userNotes = JSON.parse(userNotes);
      //deletes notes
      userNotes = userNotes.filter(function(note) {
        return note.id != req.params.id;
      });
      // turn into a string then write
      userNotes = JSON.stringify(userNotes);
      fs.writeFile("./Develop/db/db.json", userNotes, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      res.send(JSON.parse(userNotes));
      
    } catch (err) {
      throw err;
    }
  });

// Get started button clicked
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
  });

// return to original Webpage
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});
  

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

// Start server
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
});