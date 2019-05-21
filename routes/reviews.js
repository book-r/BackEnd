const express = require('express'),
      Reviews = require('../models/reviews.js');

const router = express.Router();

router.get('/', (req, res) => {
  const {user_id} = req.query;
  Reviews.getBy(user_id ? {user_id} : {})
    .then(reviews => res.status(200).json(reviews))
    .catch(error => res.status(500).json({
      message: 'Error getting reviews',
      error: error.toString()
    }));
});

router.post('/', (req, res) => {
  const review = req.body;
  if (review && review.rating && review.user_id && review.book_id) {
    Reviews.insert(review)
      .then(review => res.status(201).json(review))
      .catch(error => res.status(500).json({
        message: 'Error inserting review',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Review requires rating, user_id and book_id'
    });
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Reviews.get(id)
    .then(review => review
          ? res.status(200).json(review)
          : res.status(404).json({
            message: `Review with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting review',
      error: error.toString()
    }));
});

router.put('/:id', (req, res) => {
  const {id} = req.params,
        changes = req.body;
  // todo better validation
  changes.id = undefined;
  changes.user_id = undefined;
  changes.book_id = undefined;
  if (changes && (changes.rating || changes.comment)) {
    Reviews.update(id, changes)
      .then(review => review
            ? res.status(200).json(review)
            : res.status(404).json({
              message: `Review with id ${id} does not exist`
            }))
      .catch(error => res.status(500).json({
        message: 'Error updating review',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Update requires changes',
    });
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Reviews.remove(id)
    .then(removed => removed
          ? res.status(204).end()
          : res.status(404).json({
            message: `Review with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error deleting review',
      error: error.toString()
    }));
});

module.exports = router;
