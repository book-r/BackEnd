const express = require('express'),
      Authors = require('../models/authors.js'),
      Books = require('../models/books.js'),
      restricted = require('../middleware/restricted.js');

const router = express.Router();

/**
   @api {get} authors/ Get authors
   @apiName GetAuthors
   @apiGroup Authors
   
   @apiSuccess {Number} id author id
   @apiSuccess {String} name author name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   [{id: 1, name: "John R. Taylor"}]
*/
router.get('/', (req, res) => {
  Authors.get()
    .then(authors => res.status(200).json(authors))
    .catch(error => res.status(500).json({
      message: 'Error getting authors.',
      error: error.toString()
    }));
});

function validateAuthor(author) {
  if (author && author.name) {
    if (typeof author.name !== 'string') return 'Name needs to be string';
    if (author.name.length > 50) return 'Name is too long';
    return true;
  } else {
    return 'Requires name';
  }
}


/**
   @api {post} authors/ Add author
   @apiName AddAuthor
   @apiGroup Authors

   @apiHeader {String} Authorization json web token

   @apiParam {String} name author name

   @apiParamExample Example Body:
   { name: 'New Name' }
   
   @apiSuccess {Number} id author id
   @apiSuccess {String} name author name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 201 OK
   { id: 1,
    name: 'New Name' }
*/


router.post('/', restricted, (req, res) => {
  const author = req.body,
        valid = validateAuthor(author);
  if (valid === true) {
    Authors.insert(author)
      .then(author => res.status(201).json(author))
      .catch(error => res.status(500).json({
        message: 'Error inserting author.',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: valid
    });
  }
});


/**
   @api {get} authors/:id Get author by id
   @apiName GetAuthor
   @apiGroup Authors

   @apiParam {Number} id author id
   
   @apiSuccess {Number} id author id
   @apiSuccess {String} name author name
   @apiSuccess {Array} books an array of book objects written by the author

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
    name: 'John R. Taylor',
    books:
    [ { id: 1,
        title: 'Classical Mechanics',
        isbn: '9781891389221',
        cover_url: 'https://www.uscibooks.com/taycm.jpg',
        description:
        'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
        edition: '1',
        year: 2005,
        featured: true,
        publisher_id: 1,
        created_at: null,
        updated_at: null,
        subjects: [{id: 1, name: 'Physics'}],
        authors: [{id: 1, name: 'John R. Taylor'}],
        publisher: 'University Science Books',
        average: 4.25 } ] }
*/

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Authors.get(id)
    .then(author => author
          ? Books.withAuthor(id).then(books => res.status(200).json({...author, books}))
          : res.status(404).json({
            message: `Author with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting author',
      error: error.toString()
    }));
});

/**
   @api {put} authors/:id Update author by id
   @apiName UpdateAuthor
   @apiGroup Authors

   @apiHeader {String} Authorization json web token

   @apiParam {Number} id author id
   @apiParam {String} name author name

   @apiParamExample Example Body:
   { name: 'New Name' }
   
   @apiSuccess {Number} id author id
   @apiSuccess {String} name author name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
    name: 'New Name'
   }
*/

router.put('/:id', restricted, (req, res) => {
  const {id} = req.params,
        changes = req.body;
  // todo better validation
  changes.id = undefined;
  if (changes && changes.name) {
    Authors.update(id, changes)
      .then(author => author
            ? res.status(200).json(author)
            : res.status(404).json({
              message: `Author with id ${id} does not exist`
            }))
      .catch(error => res.status(500).json({
        message: 'Error updating author',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Update requires name',
    });
  }
});

/**
   @api {delete} authors/:id Delete author by id
   @apiName DeleteAuthor
   @apiGroup Authors

   @apiHeader {String} Authorization json web token

   @apiParam {Number} id author id

   @apiSuccessExample Success-reponse:
   HTTP/1.1 204 OK
*/

router.delete('/:id', restricted, (req, res) => {
  const {id} = req.params;
  Authors.remove(id)
    .then(removed => removed
          ? res.status(204).end()
          : res.status(404).json({
            message: `Author with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error deleting author',
      error: error.toString()
    }));
});

module.exports = router;
