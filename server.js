const express = require('express'),
      cors = require('cors'),
      helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const booksRoutes = require('./routes/books.js'),
      authorsRoutes = require('./routes/authors.js'),
      reviewsRoutes = require('./routes/reviews.js');

server.use('/api/books', booksRoutes);
server.use('/api/authors', authorsRoutes);
server.use('/api/reviews', reviewsRoutes);

module.exports = server;
