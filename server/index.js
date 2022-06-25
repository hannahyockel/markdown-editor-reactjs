const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

let notes = [];

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/note', (req, res) => {
    const note = req.body;

    // Output the note to the console for debugging
    console.log(note);
    notes.push(note);

    res.send('Note is added to the database');
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
