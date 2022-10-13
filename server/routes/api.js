const express = require('express');
const router = express.Router();
const FormPost = require('../models/FormPost');

// routes
router.get('/', (req, res) =>{
    const data = {}; 
    FormPost.find({})
        .then((data) => {
            console.log('data received');
            res.status(200).json(data)
        })
        .catch((error) =>{
            console.log('Could not retrieve data from mongodb database.');
        });
})

router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    
    const data = req.body;
    // creating an instance of the model
    const newFormPost = new FormPost(data);
    newFormPost.save((error) => {
        if (error) {
            console.log(`Could not save data to mongodb database ${error.message})`);
            res.status(400).json({ msg: "Failed to save your data." });
        }else{
            console.log('Data successfuly saved to mongodb database');
            res.status(200).json({ msg: 'We received your data!' })
        }
    });
    
})

module.exports = router;
