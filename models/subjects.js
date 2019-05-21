const db = require('../data/dbConfig.js');

module.exports = {
  ofBook,
};

function ofBook(book_id) {
  return db
    .select('subjects.id', 'subjects.name')
    .from('subjects')
    .join('books_subjects', 'books_subjects.subject_id', 'subjects.id')
    .where({book_id});
}
