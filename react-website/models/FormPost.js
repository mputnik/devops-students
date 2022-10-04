const mongoose = require('mongoose');

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

module.exports = FormPost;