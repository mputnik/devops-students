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

    // Functions for testing purposes.
    server.add = function (data) {
        const newData = new FormPost(data);
        newData.save((err) => {
            if (err) {
                console.error(`Could not save data to mongodb.\nError: ${err}`);
            }
        });
    };

    // server.get = function() {
    //     let data;
    //     FormPost.find({})
    //         .then((rawData) => {
    //             return data = rawData.map((obj) => ({
    //                 firstName: obj.firstName,
    //                 lastName: obj.lastName,
    //                 favoritePet: obj.favoritePet,
    //                 favoriteColor: obj.favoriteColor,
    //                 message: obj.message
    //             }));

    //             // console.log(rawData);
    //             // return JSON.stringify(data);
    //         });
    // }

    server.drop = async function() {
        await FormPost.deleteMany();
    };

    server.close = function() {
        mongoose.connection.close(false);
    }

    // app.listen(PORT, console.log(`Server starting at port ${PORT}`))

    return server;
}