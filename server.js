const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let noteData = require('./develop/db/db.json');

let PORT = process.env.PORT || 8080;

app.use(express.static("develop/public"));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendfile(path.join(__dirname, './develop/public/index.html'));
})

app.get("/", (req, res) => {
    res.sendfile(path.join(__dirname, './develop/public/notes.html'));
})

app.get('/api/notes', (req, res)=>{
    res.json(noteData);
})

app.get('/api/notes', (req,res) => {
    noteData.push(req.body);
    noteData.forEach(( note, i) => {
        note.id = i + 1;
    })
    let newNOte = json.stringify(noteData);
    fs.writeFileSync('./develop/db/db.json', newNOte);

    res.json(noteData);
})

app.delete('/api/notes/:id', (req, res) => {
    
    let filtered = noted.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFileSync('./develop/db/db.json', JSON.stringify(filtered));


 noteData = filtered;

 res.json(noteData);
})


app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
})