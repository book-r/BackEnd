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

function validateAuthor(author) {
  if (author && author.name) {
    if (typeof author.name !== 'string') return 'Name needs to be string';
    if (author.name.length > 50) return 'Name is too long';
    return true;
  } else {
    return 'Requires name';
  }
}

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Authors.get(id)
    .then(author => author
          ? res.status(200).json(author)
          : res.status(404).json({
            message: `Author with id ${id} does not exist`
          }))
    .catch(error => res.status(500).json({
      message: 'Error getting author',
      error: error.toString()
    }));
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
