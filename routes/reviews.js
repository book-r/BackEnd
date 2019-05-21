const express = require('express'),
      Reviews = require('../models/reviews.js');

const router = express.Router();

router.get('/', (req, res) => {
  Reviews.get()
    .then(reviews => res.status(200).json(reviews))
    .catch(error => res.status(500).json({
      message: 'Error getting reviews',
      error: error.toString();
    }));
});

module.exports = router;
