const db = require('../data/dbConfig.js');

module.exports = {
  get,
  ofBook,
  insert,
  update,
  remove
};


function get(id) {
  if (id) {
    return db('subjects').where({id}).first();
  } else {
    return db('subjects');
  }
}

function ofBook(book_id) {
  return db
    .select('subjects.id', 'subjects.name')
    .from('subjects')
    .join('books_subjects', 'books_subjects.subject_id', 'subjects.id')
    .where({book_id});
}

function insert(subject) {
  return db('subjects').insert(subject, 'id').then(([id]) => get(id));
}

function update(id, changes) {
  return db('subjects').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('subjects').where({id}).del();
}
