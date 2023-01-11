const mongoose = require('mongoose');

// mongodb schema
const Schema = mongoose.Schema;
const FormPostSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    favoritePet: {
        type: String,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    }
});

// register a Model by passing schema
const FormPost = mongoose.model('FormPost', FormPostSchema);

module.exports = FormPost;