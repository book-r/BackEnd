const db = require('../data/dbConfig.js'),
      Reviews = require('./reviews.js'),
      Authors = require('./authors.js'),
      Subjects = require('./subjects.js');

module.exports = {
  get,
};

function get(id) {
  const query = db('books').join('publishers', 'publishers.id', 'books.publisher_id');
  if (id) {
    return Promise.all([
      query.where({'books.id': id}).first(),
      Reviews.getBy({'book_id': id}),
      Authors.ofBook(id),
      Subjects.ofBook(id)
    ]).then(([book, reviews, authors, subjects]) => {
      if (book) {
        book.reviews = reviews;
        book.authors = authors;
        book.subjects = subjects;
      }
      return book;
    });
  } else {
    return query;
  }
}
