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

router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    
    const data = req.body;
    // creating an instance of the model
    const newFormPost = new FormPost(data);
    newFormPost.save((error) => {
        if (error) {
            console.log(`Could not save data to mongodb database ${error.message})`);
        }else{
            console.log('Data successfuly saved to mongodb database');
        }
    });
    res.json({
        msg: 'We received your data!'
    })
})

module.exports = router;
