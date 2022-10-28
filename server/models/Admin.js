const mongoose = require('mongoose');

// mongodb schema
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// register a Model by passing schema
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;