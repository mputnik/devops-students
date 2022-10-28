const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();
const FormPost = require('../models/FormPost');
const Admin = require('../models/Admin');

// routes
router.get('/', (req, res) =>{ 
    FormPost.find({})
        .then((rawData) => {
            console.log('data retrieved');
            let data = rawData.map((obj) => ({
                firstName: obj.firstName,
                lastName: obj.lastName,
                favoritePet: obj.favoritePet,
                favoriteColor: obj.favoriteColor,
                message: obj.message
            }));

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
            console.log(`Could not save data to mongodb database.\n${error.message})`);
            res.status(400).json({ msg: "Failed to save your data." });
        }else{
            console.log('Data successfuly saved to mongodb database');
            res.status(201).json({ msg: 'We received your data!' });
        }
    });
    
})

// Online resources say that POST is used for logins for security.
router.post('/admin/login', (req, res) => {
    const creds = req.body;

    Admin.findOne({ username: creds.username })
        .then(async (dbcreds) => {
            const passwordCorrect = await bcrypt.compare(creds.password, dbcreds.password)

            if (passwordCorrect) {
                
                const userForToken = {
                    username: creds.username
                }

                const token = jwt.sign(userForToken,'secret',{expiresIn: '1h'})
                
                res.status(200).json({token})

            } else {
                res.status(401).json({ message: "Login failed. Password incorrect." });
            }
        })
        .catch((error) => {
            res.status(404).json({ message: `Login failed. Admin not found.\nError: ${error}` });
        });
})

router.post('/admin/is-auth', (req,res) => {
    let decodedToken = null;
    const token = getTokenFrom(req)//call helper function to parse token

    if(token !== 'null' || token !== null){
        decodedToken = jwt.verify(token, 'secret')
    }
    
    if(decodedToken !== null){
        if(!token || !decodedToken.username){
            return res.status(401).json({error: 'token missing or invalid'})
        }
    }

    res.status(200).json({})
})
//
const getTokenFrom = req => {
    const authorization = req.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}
module.exports = router;