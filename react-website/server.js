// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
// built in node.js module
const path = require('path');

// Initialize express application
const app = express();

// Define port
const PORT = process.env.PORT || 8080;

// Establish connection to mongodb database
mongoose.connect('mongodb://0.0.0.0:27017/form_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose listener to check connection
mongoose.connection.on('connected', () => {
    console.log('Connection to mongodb database established successfully.')
});

// mongodb schema
const Schema = mongoose.Schema;

const FormPostSchema = new Schema({
    firstName: String,
    lastName: String,
    favoritePet: String,
    favoriteColor: String,
    message: String
});

// register a Model by passing schema
const FormPost = mongoose.model('FormPost', FormPostSchema);

// Save data to mongodb database
const data = {
    firstName: 'Khalid',
    lastName: 'Kanaan',
    favoritePet: 'cat',
    favoriteColor: 'green',
    message: 'Hello world!'
};

const newFormPost = new FormPost(data); // creating an instance of the model
newFormPost.save((error) => {
    if (error) {
        console.log(`Could not save data to mongodb database ${error.message}`);
    }else{
        console.log('Data successfuly saved to mongodb database');
    }
});

// Automatic HTTP request logger
app.use(morgan('combined'));

// Define a route
app.get('/api', (req, res) =>{
    const data = {
        firstName: 'Khalid',
        lastName: 'Kanaan',
        favoritePet: 'cat',
        favoriteColor: 'green',
        message: 'Hello world!'
    }
    res.json(data)
})

app.listen(PORT, console.log(`Server starting at port ${PORT}`))