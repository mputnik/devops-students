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