require('dotenv').config({ path: '.env' });
const app = require('./src/app');
const path = require('path')
const connectDB = require('./src/config/db');
const express = require('express');
const cors = require('cors')


connectDB();

// app.use(express.static(path.join(__dirname + "/public")));
// app.get("/*", function(req, res) {
//     res.sendFile("index.html", {root: __dirname + "/public"});
// })

app.use(cors())
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`server is listening from port ${port}`);
});
