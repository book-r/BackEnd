const express = require('express'),
      Books = require('../models/books.js'),
      restricted = require('../middleware/restricted.js'),
      setToken = require('../middleware/setToken.js'),
      roles = require('../middleware/roles.js'),
      Reviews = require('../models/reviews.js');

const router = express.Router();

/**
   @api {get} books/?featured=:featured Request books
   @apiName GetBooks
   @apiGroup Books
   
   @apiParam {Boolean} featured If true, return only featured books. False, return all books. False by default.
   
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
     featured: true,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     subjects: [{id: 1, name: 'Physics'}],
     authors: [{id: 1, name: 'John R. Taylor'}],
     publisher: 'University Science Books' 
   } ]
*/

router.get('/', (req, res) => {
  const {featured} = req.query;
  (featured ? Books.getFeatured() : Books.get())
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({
      message: 'Error getting books.',
      error: error.toString()
    }));
});

/**
   @api {post} books/:id Add book 
   @apiName PostBook
   @apiGroup Books
   
   @apiDescription Note that this endpoint does not allow for adding authors or
   subjects to the book. This must be done on the sub endpoints. If there is
   time, endpoint will gain the functionality.

   @apiHeader {String} Authorization json web token

   @apiParam {String} title book title
   @apiParam {String} isbn isbn 13 string with no formatting
   @apiParam {String} cover_url a url to a large book cover
   @apiParam {String} description book description
   @apiParam {String} edition book edition
   @apiParam {Number} year year published
   @apiSuccess {Bool} featured featured
   @apiParam {Number} publisher_id publisher id

   @apiParamExample Example Body:
   { title: 'Classical Mechanics',
     isbn: '9781891389221',
     cover_url: 'https://www.uscibooks.com/taycm.jpg',
     description:
     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
     edition: '1',
     year: 2005,
     publisher_id: 1,
   }
   
   @apiSuccess {Number} id book id
   @apiSuccess {String} title book title
   @apiSuccess {String} isbn isbn 13 string with no formatting
   @apiSuccess {String} cover_url a url to a large book cover
   @apiSuccess {String} description book description
   @apiSuccess {Number} average The average rating of the book. Null if there are no ratings.
   @apiSuccess {String} edition book edition
   @apiSuccess {Number} year year published
   @apiSuccess {Bool} featured featured
   @apiSuccess {Number} publisher_id publisher id
   @apiSuccess {Array} authors array of author objects
   @apiSuccess {Array} subjects array of subject objects
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
     featured: true,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     subjects: [{id: 1, name: 'Physics'}],
     authors: [{id: 1, name: 'John R. Taylor'}],
     publisher: 'University Science Books',
   }
   
*/

router.post('/', restricted, (req, res) => {
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
   @api {put} books/:id Update book 
   @apiName UpdateBook
   @apiGroup Books
   
   @apiHeader {String} Authorization json web token
   
   @apiParam {String} title book title
   @apiParam {String} isbn isbn 13 string with no formatting
   @apiParam {String} cover_url a url to a large book cover
   @apiParam {String} description book description
   @apiParam {String} edition book edition
   @apiParam {Number} year year published
   @apiSuccess {Bool} featured featured
   @apiParam {Number} publisher_id publisher id

   @apiParamExample Example Body:
   { title: 'Classical Mechanics Part 2',
     isbn: '9999999999999',
   }
   
   @apiSuccess {Number} id book id
   @apiSuccess {String} title book title
   @apiSuccess {String} isbn isbn 13 string with no formatting
   @apiSuccess {String} cover_url a url to a large book cover
   @apiSuccess {String} description book description
   @apiSuccess {Number} average The average rating of the book. Null if there are no ratings.
   @apiSuccess {String} edition book edition
   @apiSuccess {Number} year year published
   @apiSuccess {Bool} featured featured
   @apiSuccess {Number} publisher_id publisher id
   @apiSuccess {String} publisher publisher name
   @apiSuccess {Array} authors array of author objects
   @apiSuccess {Array} reviews array of review objects

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
     title: 'Classical Mechanics Part 2',
     isbn: '9999999999999',
     cover_url: 'https://www.uscibooks.com/taycm.jpg',
     description:
     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
     average: 4.25,
     edition: '1',
     year: 2005,
     featured: false,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     subjects: null,
     authors: null,
     publisher: 'University Science Books',
   }
   
*/

router.put('/:id', restricted, (req, res) => {
  const changes = req.body,
        {id} = req.params;
  if (true /* TODO: validate changes */) {
    Books.update(id, changes)
      .then(book => book
            ? res.status(200).json(book)
            : res.status(404).json({
              message: `Book with ${id} does not exist.`
            }))
      .catch(error => res.status(500).json({
        message: 'Error updating book.',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Changes are required'
    });
  }
});

/**
   @api {get} books/:id Request book by id
   @apiName GetBook
   @apiGroup Books

   @apiHeader {String} Authorization json web token (only needed if you want user_review)

   @apiParam {Number} id book id
   
   @apiSuccess {Number} id book id
   @apiSuccess {String} title book title
   @apiSuccess {String} isbn isbn 13 string with no formatting
   @apiSuccess {String} cover_url a url to a large book cover
   @apiSuccess {String} description book description
   @apiSuccess {Number} average The average rating of the book. Null if there are no ratings.
   @apiSuccess {String} edition book edition
   @apiSuccess {Number} year year published
   @apiSuccess {Bool} featured featured
   @apiSuccess {Object} user_review User review object or null (only if logged in)
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
     user_review: {
       book_id: 1,
       comment: "Good book!",
       id: 1,
       rating: 5,
       title: "Classical Mechanics",
       user_id: 1,
       username: "henry",
     }
     featured: true,
     publisher_id: 1,
     created_at: null,
     updated_at: null,
     publisher: 'University Science Books',
     authors: [{id: 1, name: "John R. Taylor"}],
     subjects: [{id: 1, name: "Physics"}],
     reviews:
     [ { id: 1, rating: 5, comment: 'Good book!', book_id: 1, user_id: 1, title: 'Classical Mechanics', username: 'henry' },
     { id: 2, rating: 3.5, comment: 'Love the cover', book_id: 1, user_id: 2, title: 'Classical Mechanics', username: 'blevins' } ] }
*/

router.get('/:id', setToken, (req, res) => {
  const {id} = req.params;
  const user_id = (req.token && req.token.id);
  Books.get(id, user_id)
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

/**
   @api {delete} books/:id Delete book 
   @apiName DeleteBook
   @apiGroup Books
   
   @apiHeader {String} Authorization json web token

   @apiParam {Number} id book id
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 204 OK
*/

router.delete('/:id', restricted, roles(['admin']), (req, res) => {
  const {id} = req.params;
  Books.remove(id)
    .then(removed => removed
          ? res.status(204).end()
          : res.status(404).json({
            message: `Book with id ${id} does not exist.`
          }))
    .catch(error => res.status(500).json({
      message: 'Error deleting book',
      error: error.toString()
    }));
});


// not tested because of last minute addition
/**
   @api {get} books/:id/reviews Get book reviews
   @apiName DeleteBook
   @apiGroup Books
   
   @apiHeader {String} Authorization json web token

   @apiParam {Number} id book id
   
   @apiSuccess {Array} reviews book review array
   
   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   [
     {
       "id": 1,
       "title": "Classical Mechanics",
       "username": "henry",
       "book_id": 1,
       "user_id": 1,
       "rating": 5,
       "comment": "Good book!"
     },
     {
       "id": 2,
       "title": "Classical Mechanics",
       "username": "blevins",
       "book_id": 1,
       "user_id": 2,
       "rating": 3.5,
       "comment": "Love the cover"
     }
   ]
*/

router.get('/:id/reviews', (req, res) => {
  const {id} = req.params;
  Reviews.getBy({book_id: id})
    .then(reviews => res.status(200).json(reviews))
    .catch(error => res.status(500).json({
      message: 'Error getting reviews.',
      error: error.toString()
    }));
});

module.exports = router;
