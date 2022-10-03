// const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

const URL = 'mongodb://localhost:27017';
const DBNAME = 'testbase';
const COLNAME = 'table';

// const client = new MongoClient(URL);

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: "Content-type",
    optionsSuccessStatus: 200
}

app.use(express.json());

app.listen(PORT, () => console.log(`Server on at http://localhost:${PORT}`));

// async so you can explicitly state the awaits?
app.get("/data/table", cors(corsOptions), (req, res) => fget(req, res));

function fget (req, res) {
    // Change to extracting json array from database.
    const testobj = require("./testData.json");
    res.json(testobj);
}

app.options("/data/entry", cors(corsOptions));
app.post("/data/entry", cors(corsOptions), (req, res) => fpost(req, res));

function fpost(req, res) {
    console.log(req.body);
    res.sendStatus(200);
}
