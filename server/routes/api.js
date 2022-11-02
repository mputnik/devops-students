const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();
const FormPost = require('../models/FormPost');
const Admin = require('../models/Admin');

//swagger docs imports
const swaggerJSDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'HC Form App api',
          version: '1.0.0',
        },
        servers : [
            {
                url: 'http://localhost:4000/api'
            }
        ]
    },
    apis: ['./routes/api.js']
}

const swaggerSpec = swaggerJSDocs(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 *  tags:
 *      name: - admin
 *          description: Admin api calls 
 *      name: - table
 *          description: Table api calls
 */

/** 
 * @swagger
 *  components:
 *      schemas:
 *          retrieve: 
 *              type: object
 *              require:
 *              - firstName
 *              - lastName
 *              - favoritePet
 *              - favoriteColor
 *              - _id
 *              properties:
 *                  firstName: 
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  favoritePet:
 *                      type: string
 *                  favoriteColor:
 *                      type: string
 *                  message:
 *                      type: string
 *                  _id:
 *                      type: string
*/

/** 
 * @swagger
 *  components:
 *      schemas:
 *          save: 
 *              type: object
 *              require:
 *              - firstName
 *              - lastName
 *              - favoritePet
 *              - favoriteColor
 *              properties:
 *                  firstName: 
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  favoritePet:
 *                      type: string
 *                  favoriteColor:
 *                      type: string
 *                  message:
 *                      type: string
*/

/**
 * @swagger
 * /:
 *  get: 
 *      summary: retreive data from the database
 *      tags: 
 *          - table
 *      description: This api is used to retrieve the data from the database
 *      responses:
 *          '200': 
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/retrieve'
 *          '404':
 *              description: Could not retrieve data from mongodb database
 */

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

/**
 * @swagger
 * /save:
 *  post: 
 *      summary: save data to the database
 *      tags: 
 *          - table
 *      description: This api is used to save data to the database
 *      requestBody:
 *          description: testing
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/save'
 *      responses:
 *          201: 
 *              description: Data successfuly saved to mongodb database
 *          400:
 *              description: Could not save data to mongodb database
 */

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

/**
 * @swagger
 * /search/{id}:
 *  get: 
 *      summary: retrieve an item by id from the database
 *      tags: 
 *          - table
 *      description: This api is used to retrieve an item by {id} from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200: 
 *              description: Data successfuly retreived
 *          400:
 *              description: Could not retrieve data from mongodb database
 */

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

/**
 * @swagger
 * /admin/delete/{id}:
 *  delete: 
 *      summary: delete an item by id from the database
 *      tags:
 *          - admin
 *      description: This api is used to delete an item by {id} from the database 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          201: 
 *              description: Data successfuly deleted from mongodb database
 *          401:
 *              description: Token missing or invalid
 *          404:
 *              description: Could not delete data from mongodb database.
 */

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

/**
 * @swagger
 * /admin/edit/{id}:
 *  put: 
 *      summary: edit an item by id from the database
 *      tags: 
 *          - admin
 *      description: This api is used to edit an item by {id} from the database when signed in as an admin. 
 *      responses:
 *          201: 
 *              description: Data successfuly updated to mongodb database
 *          401:
 *              description: Token missing or invalid
 *          404:
 *              description: Could not edit data from mongodb database.
 */

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

/**
 * @swagger
 * /admin/login:
 *  post: 
 *      summary: sign in
 *      tags: 
 *          - admin
 *      description: This api is used to sign in as an admin. 
 *      responses:
 *          201: 
 *              description: Login success.
 *          401:
 *              description: Login failed. Password incorrect.
 *          404:
 *              description: Login failed. Admin not found.
 */

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

/**
 * @swagger
 * /admin/is-auth:
 *  post: 
 *      summary: checks if user is authorized
 *      tags: 
 *          - admin
 *      description: This api is used to check if a user is authorized
 *      responses:
 *          201: 
 *              description: User is authorized
 *          401:
 *              description: User is not authorzied (token missing or invalid)
 */

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