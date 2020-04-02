const Reader = require('../models/Reader');

module.exports = {
    async index(req, res) {
        const readers = await Reader.find({}).sort('readerID');

        return res.json(readers);
    },

    async store(req, res) {
        const readers = await Reader.find({}).sort('-readerID');

        if (readers.length > 0) {
            const readerID = readers[0].readerID + 1;
            const newReader = await Reader.create({
                name: req.body.name,
                weeklyReadingGoal: req.body.weeklyReadingGoal,
                totalMinutesRead: req.body.totalMinutesRead,
                readerID: readerID
            });

            return res.json(newReader);
        } else {
            const newReader = await Reader.create({
                name: req.body.name,
                weeklyReadingGoal: req.body.weeklyReadingGoal,
                totalMinutesRead: req.body.totalMinutesRead,
                readerID: 0
            });

            return res.json(newReader);
        }
    },

    async show(req, res) {
        const id = req.params.id;
        const reader = await Reader.find({ readerID: id });

        return res.json(reader);
    },

    async update(req, res) {
        const id = req.params.id;
        const newReader = await Reader.updateOne({ readerID: id }, {
            name: req.body.name,
            weeklyReadingGoal: req.body.weeklyReadingGoal,
            totalMinutesRead: req.body.totalMinutesRead
        });

        return res.json(newReader);
    },

    async delete(req, res) {
        const id = req.params.id;
        const deleteReader = await Reader.deleteOne({ readerID: id });

        return res.json(deleteReader);
    }
};
