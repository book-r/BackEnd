const express = require('express'),
      Reviews = require('../models/reviews.js'),
      restricted = require('../middleware/restricted.js');

const router = express.Router();

/**
   @api {get} reviews/?user_id={:user_id} Request reviews
   @apiName GetReviews
   @apiGroup Reviews
   
   @apiParam {Number} user_id An optional user id to get all reviews belonging to that user
   
   @apiSuccess {Array} reviews an array of review objects
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   [{ id: 1,
      rating: 5,
      comment: 'Good book!',
      book_id: 1,
      title: 'Classical Mechanics',
      user_id: 1,
      username: 'henry'
   }]
*/

router.get('/', (req, res) => {
  const {user_id} = req.query;
  Reviews.getBy(user_id ? {user_id} : {})
    .then(reviews => res.status(200).json(reviews))
    .catch(error => res.status(500).json({
      message: 'Error getting reviews',
      error: error.toString()
    }));
});


/**
   @api {post} reviews/ Post review
   @apiName PostReview
   @apiGroup Reviews

   @apiHeader {String} Authorization json web token
   
   @apiParam {Number{0.0-5.0}} rating a floating point number between 0 and 5
   @apiParam {String} comment optional comment string
   @apiParam {Number} book_id book id
   
   @apiParamExample Example request body:
   { rating: 4.6,
     comment: 'It was pretty good',
     book_id: 1,
     user_id: 2 }

   @apiSuccess {Number} id comment id
   @apiSuccess {String} comment A comment string, or null.
   @apiSuccess {Number} rating user rating for book
   @apiSuccess {String} username username
   @apiSuccess {Number} book_id book id
   @apiSuccess {Number} user_id user id
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 5
     rating: 4.6,
     comment: 'It was pretty good',
     username: 'blevins',
     title: 'Classical Mechanics'
     book_id: 1,
     user_id: 2 }
   
*/

router.post('/', restricted, (req, res) => {
  const review = req.body;
  review.user_id = req.token.id;
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


/**
   @api {get} reviews/:id Request review by id
   @apiName GetReview
   @apiGroup Reviews

   @apiParam {Number} id review id
   
   @apiSuccess {Number} id comment id
   @apiSuccess {String} comment A comment string, or null.
   @apiSuccess {Number} rating user rating for book
   @apiSuccess {String} username username
   @apiSuccess {Number} book_id book id
   @apiSuccess {Number} user_id user id
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
     rating: 5,
     comment: 'Good book!',
     book_id: 1,
     title: 'Classical Mechanics',
     user_id: 1,
     username: 'henry'
   }
*/

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


/**
   @api {put} reviews/:id Update review by id
   @apiName UpdateReview
   @apiGroup Reviews
   @apiDescription Only the user who made the review may update it.
   
   @apiHeader {String} Authorization json web token
   
   @apiParam {Number} id review id
   
   @apiParamExample Example request body:
   { rating: 0.5,
     comment: 'It is not very good',
     book_id: 1,
     user_id: 2 }

   @apiSuccess {Number} id comment id
   @apiSuccess {String} comment A comment string, or null.
   @apiSuccess {Number} rating user rating for book
   @apiSuccess {String} username username
   @apiSuccess {Number} book_id book id
   @apiSuccess {Number} user_id user id

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 5
     rating: 0.5,
     comment: 'It is not very good',
     username: 'blevins',
     title: 'Classical Mechanics'
     book_id: 1,
     user_id: 2 }
*/

router.put('/:id', restricted, (req, res) => {
  const {id} = req.params,
        changes = req.body;
  const user_id = req.token.id;
  // todo better validation
  delete changes.id;
  delete changes.user_id;
  delete changes.book_id;
  if (changes && (changes.rating || changes.comment)) {
    Reviews.get(id)
      .then(review => review
            ? (review.user_id !== user_id
               ? res.status(403).json({
                 message: 'Cannot modify review made by another user'
               })
               : Reviews.update(id, changes)
               .then(review => review
                     ? res.status(200).json(review)
                     : res.status(404).json({
                       message: `Review with id ${id} does not exist`
                     }))
               .catch(error => res.status(500).json({
                 message: 'Error updating review',
                 error: error.toString()
               }))
              )
            : res.status(404).json({
              message: `Review with id ${id} does not exist`
            }))
      .catch(error => res.status(500).json({
        message: 'Error getting comment',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Update requires changes',
    });
  }
});

/**
   @api {delete} reviews/:id Delete review by id
   @apiName DeleteReview
   @apiGroup Reviews
   @apiDescription Only the user who made the review may delete it.
   
   @apiHeader {String} Authorization json web token
   
   @apiParam {Number} id review id
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 204 OK
*/

router.delete('/:id', restricted, (req, res) => {
  const {id} = req.params;
  const user_id = req.token.id;
  Reviews.get(id)
    .then(review => review
          ? (review.user_id !== user_id
             ? res.status(403).json({
               message: 'Cannot delete review made by another user'
             })
             : Reviews.remove(id)
             .then(removed => removed
                   ? res.status(204).end()
                   : res.status(404).json({
                     message: `Review with id ${id} does not exist`
                   }))
             .catch(error => res.status(500).json({
               message: 'Error deleting review',
               error: error.toString()
             }))
            )
          : res.status(404).json({
            message: `Review with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting comment',
      error: error.toString()
    }));
});

module.exports = router;
