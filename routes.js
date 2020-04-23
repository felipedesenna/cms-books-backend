const express = require('express');

const routes = express.Router();

const BookController = require('./controllers/BookController');
const ReaderController = require('./controllers/ReaderController');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middleware/auth');

routes.post('/api/users', UserController.store);
routes.post('/api/auth', UserController.index);
routes.get('/api/books', BookController.index);
routes.get('/api/readers', ReaderController.index);

//authorization api
routes.use(authMiddleware);

routes.post('/api/books', BookController.store);
routes.get('/api/books/:id', BookController.show);
routes.put('/api/books/:id', BookController.update);
routes.put('/api/books', BookController.updatePopularOld);
routes.patch('/api/books/:id', BookController.updatePopular);
routes.delete('/api/books/:id', BookController.delete);

routes.post('/api/readers', ReaderController.store);
routes.get('/api/readers/:id', ReaderController.show);
routes.put('/api/readers/:id', ReaderController.update);
routes.delete('/api/readers/:id', ReaderController.delete);

module.exports = routes;
