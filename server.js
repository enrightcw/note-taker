// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));

//Add Code Here

// fs.readFileSync("./db/db.json", 'utf8')

let noteDump = [];


app.get("/api/notes", function(req, res) {
    
    try{
        noteDump = fs.readFileSync("./develop/db/db.json", 'utf8');
        console.log("IT WORKED!")
        noteDump = JSON.parse(noteDump);
    }

    catch (err){
        console.log(err);
    }

    res.json(noteDump);
});

app.post("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/db/db.json"));
});

app.delete("/api/notes/:id", function(reg,res) {
    res.sendFile(path.join(__dirname, "./develop/db/db.json"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"))
    
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
