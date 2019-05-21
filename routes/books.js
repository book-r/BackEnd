const express = require('express'),
      Books = require('../models/books.js');

const router = express.Router();

/**
   @api {get} books Request books
   @apiName GetBooks
   @apiGroup Books
   
   @apiSuccess {Array} books an array of book objects
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   [ { 
     id: 1,
     title: 'Classical Mechanics',
     isbn: '9781891389221',
     cover_url: 'https://www.uscibooks.com/taycm.jpg',
     description:
     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
     average: 4.25,
     edition: '1',
     year: 2005,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     publisher: 'University Science Books' 
   } ]
*/

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

/**
   @api {get} books/:id Request book by id
   @apiName GetBook
   @apiGroup Books

   @apiParam {Number} id book id
   
   @apiSuccess {Number} id book id
   @apiSuccess {String} title book title
   @apiSuccess {String} isbn isbn 13 string with no formatting
   @apiSuccess {String} cover_url a url to a large book cover
   @apiSuccess {String} description book description
   @apiSuccess {Number} average The average rating of the book. Null if there are no ratings.
   @apiSuccess {String} edition book edition
   @apiSuccess {Number} year year published
   @apiSuccess {Number} publisher_id publisher id
   @apiSuccess {String} publisher publisher name
   @apiSuccess {Array} authors array of author objects
   @apiSuccess {Array} reviews array of review objects
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
     title: 'Classical Mechanics',
     isbn: '9781891389221',
     cover_url: 'https://www.uscibooks.com/taycm.jpg',
     description:
     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
     average: 4.25,
     edition: '1',
     year: 2005,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     publisher: 'University Science Books',
     authors: [{id: 1, name: "John R. Taylor",},],
     subjects: [{id: 1, name: "Physics",},],
     reviews:
     [ { id: 1, rating: 5, comment: 'Good book!', book_id: 1, user_id: 1, title: 'Classical Mechanics', username: 'henry' },
     { id: 2, rating: 3.5, comment: 'Love the cover', book_id: 1, user_id: 2, title: 'Classical Mechanics', username: 'blevins' } ] }
*/

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
