const db = require('../data/dbConfig.js'),
      Reviews = require('./reviews.js'),
      Authors = require('./authors.js'),
      Subjects = require('./subjects.js');

module.exports = {
  get,
  insert,
  update,
  remove,
  withAuthor,
  withSubject
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
        .groupBy('id', 'publisher');
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

function update(id, changes) {
  return db('books').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('books').where({id}).del();
}

function withAuthor(author_id) {
  return get()
    .with('ba', qb => {
      qb.select('book_id', 'author_id').from('books_authors');
    })
    .join('ba', 'ba.book_id', 'books.id')
    .where({author_id});
}

function withSubject(subject_id) {
  return get()
    .with('bs', qb => {
      qb.select('book_id', 'subject_id').from('books_subjects');
    })
    .join('bs', 'bs.book_id', 'books.id')
    .where({subject_id});
}
