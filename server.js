const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;
const root = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(root, "notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(root, "index.html"));
});

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("A new note has been saved: ", newNote);
    res.json(savedNotes);
})

app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Note ID ${noteID} has been deleted.`) ;
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteID;
    })
    
    for (currentNote of savedNotes) {
        currentNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.listen(PORT, () => {
    console.log(`Application lauched at ${PORT}. Enjoy your stay!`);
})