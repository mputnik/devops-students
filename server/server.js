module.exports = function(dbName) {
    let server = {};

    // Import npm packages
    const express = require('express');
    const mongoose = require('mongoose');
    const morgan = require('morgan');
    const FormPost = require('./models/FormPost');

    // Initialize express application
    const app = express();

    // Import routes
    const routes = require('./routes/api');

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

    // Functions for testing purposes.
    server.add = function (data) {
        const newData = new FormPost(data);
        newData.save((err) => {
            if (err) {
                console.error(`Could not save data to mongodb.\nError: ${err}`);
            }
        });
    };

    server.drop = async function() {
        await FormPost.deleteMany();
    };

    server.close = function() {
        mongoose.connection.close(false);
    };

    return server;
}
