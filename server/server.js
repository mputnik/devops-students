module.exports = function(dbName,address) {
    let server = {};

    // Import npm packages
    const express = require('express');
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const morgan = require('morgan');
    const FormPost = require('./models/FormPost');
    const Admin = require('./models/Admin');

    // Initialize express application
    const app = express();

    // Import routes
    const routes = require('./routes/api');

    // Establish connection to mongodb database
    mongoose.connect(`mongodb://${address}:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // mongoose listener to check connection
    mongoose.connection.on('connected', () => {
        console.log('Connection to mongodb database established successfully.')
    });

    // enable mongoose debugger to show query operations
    mongoose.set('debug', true);

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

    // For development. Eventually, may need to remove in deployment/production.
    server.initAdmin = async function () {
        //This block is for hashing the password before insertion into db
        //async/await is needed since hashing is CPU intensive
        const saltRounds = 10;
        const password = 'admin';//this is very secure btw

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newAdmin = new Admin({ username: "admin", password: passwordHash });
        newAdmin.save((err) => {
            if (err) console.error(`Could not add new admin.\nError: ${err}`);
        });
    }

    return server;
}
