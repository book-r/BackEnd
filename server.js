const express = require('express'),
      cors = require('cors'),
      helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const booksRoutes = require('./routes/books.js'),
      authorsRoutes = require('./routes/authors.js'),
      subjectsRoutes = require('./routes/subjects.js'),
      reviewsRoutes = require('./routes/reviews.js'),
      authRoutes = require('./routes/auth.js');

server.use('/api/books', booksRoutes);
server.use('/api/authors', authorsRoutes);
server.use('/api/subjects', subjectsRoutes);
server.use('/api/reviews', reviewsRoutes);
server.use('/api/auth', authRoutes);

server.use('/api/', express.static('docs'));
server.use('/', express.static('docs'));

module.exports = server;
