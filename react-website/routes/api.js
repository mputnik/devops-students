const express = require('express');
const router = express.Router();
const FormPost = require('../models/FormPost');

// routes
router.get('/', (req, res) =>{
    const data = {}; 
    FormPost.find({})
        .then((data) => {
            console.log(data);
        })
        .catch((error) =>{
            console.log('Could not retrieve data from mongodb database.');
        });

    res.json(data)
})

module.exports = router;
