const express = require('express'),
      Subjects = require('../models/subjects.js'),
      Books = require('../models/books.js'),
      restricted = require('../middleware/restricted.js');

const router = express.Router();

/**
   @api {get} subjects/ Get subjects
   @apiName GetSubjects
   @apiGroup Subjects
   
   @apiSuccess {Number} id subject id
   @apiSuccess {String} name subject name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   [{id: 1, name: "Physics"}]
*/
router.get('/', (req, res) => {
  Subjects.get()
    .then(subjects => res.status(200).json(subjects))
    .catch(error => res.status(500).json({
      message: 'Error getting subjects.',
      error: error.toString()
    }));
});

function validateSubject(subject) {
  if (subject && subject.name) {
    if (typeof subject.name !== 'string') return 'Name needs to be string';
    if (subject.name.length > 50) return 'Name is too long';
    return true;
  } else {
    return 'Requires name';
  }
}

/**
   @api {post} subjects/ Add subject 
   @apiName CreateSubject
   @apiGroup Subjects

   @apiHeader {String} Authorization json web token

   @apiParam {String} name subject name

   @apiParamExample Example Body:
   { name: 'New Name' }
   
   @apiSuccess {Number} id subject id
   @apiSuccess {String} name subject name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 201 OK
   { id: 10,
    name: 'New Name' }
*/

router.post('/', restricted, (req, res) => {
  const subject = req.body,
        valid = validateSubject(subject);
  if (valid === true) {
    Subjects.insert(subject)
      .then(subject => res.status(201).json(subject))
      .catch(error => res.status(500).json({
        message: 'Error inserting subject.',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: valid
    });
  }
});


/**
   @api {get} subjects/:id Get subject by id
   @apiName GetSubject
   @apiGroup Subjects

   @apiParam {Number} id subject id
   
   @apiSuccess {Number} id subject id
   @apiSuccess {String} name subject name
   @apiSuccess {Array} books an array of book objects in the subject

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
    name: 'Physics',
    books:
    [ { id: 1,
        title: 'Classical Mechanics',
        isbn: '9781891389221',
        cover_url: 'https://www.uscibooks.com/taycm.jpg',
        description:
        'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
        edition: '1',
        featured: true,
        year: 2005,
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
  Subjects.get(id)
    .then(subject => subject
          ? Books.withSubject(id).then(books => res.status(200).json({...subject, books}))
          : res.status(404).json({
            message: `Subject with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting subject',
      error: error.toString()
    }));
});

/**
   @api {put} subjects/:id Update subject by id
   @apiName UpdateSubject
   @apiGroup Subjects

   @apiHeader {String} Authorization json web token

   @apiParam {Number} id subject id
   @apiParam {String} name subject name

   @apiParamExample Example Body:
   { name: 'New Name' }
   
   @apiSuccess {Number} id subject id
   @apiSuccess {String} name subject name

   @apiSuccessExample Success-reponse:
   HTTP/1.1 200 OK
   { id: 1,
    name: 'New Name' }
*/

router.put('/:id', restricted, (req, res) => {
  const {id} = req.params,
        changes = req.body;
  // todo better validation
  changes.id = undefined;
  if (changes && changes.name) {
    Subjects.update(id, changes)
      .then(subject => subject
            ? res.status(200).json(subject)
            : res.status(404).json({
              message: `Subject with id ${id} does not exist`
            }))
      .catch(error => res.status(500).json({
        message: 'Error updating subject',
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: 'Update requires name',
    });
  }
});

/**
   @api {delete} subjects/:id Delete subject by id
   @apiName DeleteSubject
   @apiGroup Subjects

   @apiHeader {String} Authorization json web token

   @apiParam {Number} id subject id

   @apiSuccessExample Success-reponse:
   HTTP/1.1 204 OK
*/

router.delete('/:id', restricted, (req, res) => {
  const {id} = req.params;
  Subjects.remove(id)
    .then(removed => removed
          ? res.status(204).end()
          : res.status(404).json({
            message: `Subject with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error deleting subject',
      error: error.toString()
    }));
});

module.exports = router;
