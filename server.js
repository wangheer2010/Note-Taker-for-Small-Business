// load dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { "v4": uuidv4 } = require('uuid');
// Reference the list of notes
const allNotes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Join and save notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

// calls home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// calls notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Post new notes
app.post('/api/notes', (req, res) => {
    const allNotes =  JSON.parse(fs.readFileSync('./db/db.json'));
    const newNote = req.body;
    newNote.id = uuidv4();
    allNotes.push(newNote);
    fs.writeFileSync('./db/db.json',JSON.stringify(allNotes));
    res.json(allNotes);
});

// Delete notes
app.delete("/api/notes/:id", (req, res) => {
    const allNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = allNotes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

// Start Listing
app.listen(PORT, () => {
    console.log(`API listening on port: ${PORT}!`);
});  