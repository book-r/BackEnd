const db = require('../data/dbConfig.js');

module.exports = {
  get,
  ofBook,
  insert,
  remove,
  update,
};

function get(id) {
  if (id) {
    return db('authors').where({id}).first();
  } else {
    return db('authors');
  }
}

function ofBook(book_id) {
  return db
    .select('authors.id', 'authors.name')
    .from('authors')
    .join('books_authors', 'books_authors.author_id', 'authors.id')
    .where({book_id});
}

function insert(author) {
  return db('authors').insert(author, 'id').then(([id]) => get(id));
}

function update(id, changes) {
  return db('authors').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('authors').where({id}).del();
}
