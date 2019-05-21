const express = require('express'),
      Books = require('../models/books.js');

const router = express.Router();

router.get('/', (req, res) => {
  Books.get()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({
      message: 'Error getting books.',
      error: error.toString()
    }));
});

router.post('/', (req, res) => {
  const book = req.body;
  if (true /* TODO: validate book */) {
    Books.insert(book)
      .then(book => res.status(201).json(book))
      .catch(error => res.status(500).json({
        message: 'Error inserting book.',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Book is not valid.'
    });
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Books.get(id)
    .then(book => book
          ? res.status(200).json(book)
          : res.status(404).json({
            message: `Book with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting book.',
      error: error.toString()
    }));
});


module.exports = router;
