const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

mongoose.connect(
    'mongodb://felipesenna:nikefs20@ds053206.mlab.com:53206/app-books',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3030, () => {
    console.log('Server started on port 3030');
});
