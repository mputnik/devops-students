// const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = 8080;

const URL = 'mongodb://localhost:27017';
const DBNAME = 'testbase';
const COLNAME = 'table';

// const client = new MongoClient(URL);

app.use(express.json());

app.listen(PORT, () => console.log(`Server on at http://localhost:${PORT}`));

// async so you can explicitly state the awaits?
app.get("/data/entry", (req, res) => fget(req, res));

function fget (req, res) {
    // Change to extracting json array from database.
    const testobj = require("./testData.json");

    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    res.json(testobj);
}

app.post("/data/entry", (req, res) => fpost(req, res));

function fpost(req, res) {
    const { firstName, lastName, favoriteColor, favoritePet, message } = req.body;
    
    console.log(message);

    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    res.sendStatus(200);
}
