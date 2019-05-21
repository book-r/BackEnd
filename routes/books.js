const express = require('express'),
      Books = require('../models/books.js');

const router = express.Router();

router.get('/', (req, res) => {
  Books.get()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({
      message: 'Error getting books.',
      error: error.toString()
    }))
});

module.exports = router;
