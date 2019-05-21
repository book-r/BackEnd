const express = require('express'),
      Authors = require('../models/authors.js');

const router = express.Router();

router.get('/', (req, res) => {
  Authors.get()
    .then(authors => res.status(200).json(authors))
    .catch(error => res.status(500).json({
      message: 'Error getting authors.',
      error: error.toString()
    }));
});

module.exports = router;
