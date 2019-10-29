const path = require('path');
const express = require('express');

const PORT = process.env.PORT ? process.env.PORT : 8080;
const DIST_DIR = path.join(__dirname, "dist")
const app = express();

app.use(express.static(DIST_DIR));

app.get("", function(req, res) {
    res.sendFile('index.html')
})
console.log("Listening on port number: ", PORT);
app.listen(PORT);