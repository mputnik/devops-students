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
                message: obj.message,
                _id: obj._id
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

// dynamic routes use ':' to indicate url params
router.get('/search/:id', (req, res) => {
    const id = req.params.id;
    FormPost.findById(`${id}`)
        .then((rawData) => {
            console.log('data received');
            res.status(200).json(rawData);
        })
        .catch((error) =>{
            console.log(`Could not retrieve data from mongodb database.\n${error.message})`);
        });
})

router.delete('/admin/delete/:id', (req, res) =>{
    const id = req.params.id;

    let decodedToken = null;
    const token = getTokenFrom(req)//call helper function to parse token

    if(token !== null){
        decodedToken = jwt.verify(token, 'secret')
    }
    
    if(decodedToken !== null){
        if(token && decodedToken.username){
            FormPost.findByIdAndDelete(`${id}`)
                .then((rawData) => {
                    console.log(rawData);
                    res.status(201).json({ message: `id ${id} data successfuly deleted from to mongodb database` });
                })
                .catch((error) =>{
                    res.status(404).json({ message: `Query failed. Could not delete data from mongodb database.\nError: ${error}` });
                });
            return
        }
    } 

    res.status(401).json({message: 'token missing or invalid'})

})

router.put('/admin/edit/:id', (req, res) => {
    const id = req.params.id;
    const newdata = req.body;

    let decodedToken = null;
    const token = getTokenFrom(req)//call helper function to parse token

    if(token !== null){
        decodedToken = jwt.verify(token, 'secret')
    }
    
    if(decodedToken !== null){
        if(token && decodedToken.username){
            FormPost.findByIdAndUpdate(`${id}`, 
                                        {$set:{firstName: newdata.firstName, lastName: newdata.lastName,
                                        favoritePet: newdata.favoritePet,favoriteColor: newdata.favoriteColor,
                                        message: newdata.message}}, {new: true})
                .then(() => {
                    res.status(200).json({ message: `id ${id} data successfuly updated` });
                })
                .catch((error) => {
                    res.status(404).json({ message: `Could not update data.\nError: ${error}` });
                });
            return
        }
    } 

    res.status(401).json({message: 'token missing or invalid'})
    
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

    if(token !== null){
        decodedToken = jwt.verify(token, 'secret')
    }
    
    if(decodedToken !== null){
        if(token && decodedToken.username){
            res.status(200).json({})
            return
        }
    } 

    res.status(401).json({message: 'token missing or invalid'})

})

const getTokenFrom = req => {
    const authorization = req.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}
module.exports = router;