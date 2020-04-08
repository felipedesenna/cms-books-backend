const Book = require('../models/Book');

module.exports = {
    async index(req, res) {
        const books = await Book.find({}).sort('bookID');

        return res.json(books);
    },

    async store(req, res) {
        const books = await Book.find({}).sort('-bookID');
        
        if (books.length > 0) {
            const bookID = books[0].bookID + 1;
            const newBook = await Book.create({
                title: req.body.title,
                author: req.body.author,
                publicationYear: req.body.publicationYear,
                popular: false,
                bookID: bookID
            });

            return res.json(newBook);
        } else {
            const newBook = await Book.create({
                title: req.body.title,
                author: req.body.author,
                publicationYear: req.body.publicationYear,
                popular: false,
                bookID: 0
            });

            return res.json(newBook);
        }
    },

    async show(req, res) {
        const id = req.params.id;
        const book = await Book.find({ bookID: id });

        return res.json(book);
    },

    async update(req, res) {
        const id = req.params.id;
        const newBook = await Book.updateOne({ bookID: id }, {
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        });

        return res.json(newBook);
    },

    async delete(req, res) {
        const id = req.params.id;
        const deleteBook = await Book.deleteOne({ bookID: id });

        return res.json(deleteBook);
    }
};
