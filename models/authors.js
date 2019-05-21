const db = require('../data/dbConfig.js');

module.exports = {
  ofBook,
};

function ofBook(book_id) {
  return db
    .select('authors.id', 'authors.name')
    .from('authors')
    .join('books_authors', 'books_authors.author_id', 'authors.id')
    .where({book_id});
}
