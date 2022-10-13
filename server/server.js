module.exports = function(dbName) {
    let server = {};

    // Import npm packages
    const express = require('express');
    const mongoose = require('mongoose');
    const morgan = require('morgan');
    const FormPost = require('./models/FormPost');
    // built in node.js module
    // const path = require('path');

    // Initialize express application
    const app = express();

    // Define port
    // const PORT = process.env.PORT || 8080;

    // Import routes
    const routes = require('../server/routes/api');

    // Establish connection to mongodb database
    mongoose.connect(`mongodb://0.0.0.0:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // mongoose listener to check connection
    mongoose.connection.on('connected', () => {
        console.log('Connection to mongodb database established successfully.')
    });

    // Making all the requests available as json or urlencoded
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    // Automatic HTTP request logger
    app.use(morgan('combined'));

    // register routes
    app.use('/api', routes);

    server.app = app;

    server.drop = function() {
        FormPost.deleteMany({}, (err) => {
            console.error(`Error: ${err}`);
        });
    };

    server.close = function() {
        mongoose.connection.close();
    }

    // app.listen(PORT, console.log(`Server starting at port ${PORT}`))

    return server;
}