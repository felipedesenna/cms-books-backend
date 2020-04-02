const mongoose = require('mongoose');

const ReaderSchema = new mongoose.Schema({
    readerID: Number,
    name: String,
    weeklyReadingGoal: Number,
    totalMinutesRead: Number
});

module.exports = mongoose.model('Reader', ReaderSchema);
