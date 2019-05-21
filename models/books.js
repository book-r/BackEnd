const db = require('../data/dbConfig.js'),
      Reviews = require('./reviews.js'),
      Authors = require('./authors.js'),
      Subjects = require('./subjects.js');

module.exports = {
  get,
  insert
};

function get(id) {
  const query = db('books')
        .select(['id', 'title', 'isbn', 'cover_url', 'description', 'edition', 'year', 'books.publisher_id', 'created_at', 'updated_at', 'publisher'])
        .with('p', qb => {
          qb.select('publisher', 'id as publisher_id').from('publishers');
        })
        .with('r', qb => {
          qb.select('rating', 'book_id').from('reviews');
        })
        .join('p', 'p.publisher_id', 'books.publisher_id')
        .leftJoin('r', 'r.book_id', 'books.id')
        .avg({average: 'rating'})
        .groupBy('id');
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

function insert(book) {
  return db('books')
    .insert(book, 'id')
    .then(([id]) => get(id));
}
