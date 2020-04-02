const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookID: Number,
    title: String,
    author: String,
    publicationYear: Number
});

module.exports = mongoose.model('Book', BookSchema);
