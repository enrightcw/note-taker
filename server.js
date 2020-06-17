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

let noteDump = [];
let counterID = 0;

// api call for all notes in the db.json file and sends the results as an array of objects.

app.get("/api/notes", function(req, res) {
    
    try{
        noteDump = fs.readFileSync("./Develop/db/db.json", 'utf8');
        noteDump = JSON.parse(noteDump);
    }

    catch (err){
        console.log(err);
    }

    res.json(noteDump);
});

app.post("/api/notes", function(req, res) {
    try {
        noteDump = fs.readFileSync("./Develop/db/db.json", "utf8");  
        noteDump = JSON.parse(noteDump);
        req.body.id = counterID;
        counterID++;

        noteDump.push(req.body); 

        noteDump = JSON.stringify(noteDump);

        fs.writeFileSync("./Develop/db/db.json", noteDump, "utf8", function(err) {
          if (err) throw err;
        });

        res.json(JSON.parse(noteDump));
    
    } catch (err) {
        throw err;
        console.error(err);
    }
});


app.delete("/api/notes/:id", function(req,res) {
    try {
        noteDump = fs.readFileSync("./Develop/db/db.json", "utf8");
        noteDump = JSON.parse(noteDump);
        noteDump = noteDump.filter(function(note) {
            return note.id != req.params.id;
        });
        noteDump = JSON.stringify(noteDump);

        fs.writeFileSync("./Develop/db/db.json", noteDump, "utf8");
    
        res.send(JSON.parse(noteDump));
    
    }   catch (err) {
        throw err;
        console.log(err);
    }
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
    
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
