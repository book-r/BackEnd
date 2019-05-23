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
  withSubject,
  getFeatured
};

function get(id, user_id) {
  const query = db('books')
        .select(['books.id', 'title', 'isbn', 'cover_url', 'description', 'edition', 'year', 'books.publisher_id', 'created_at', 'updated_at', 'featured', 'publisher', 'average',
                 db.raw('json_strip_nulls(json_agg(json_build_object(\'id\', a.author_id, \'name\', a.author_name))) as authors'),
                 db.raw('json_strip_nulls(json_agg(json_build_object(\'id\', s.subject_id, \'name\', s.subject_name))) as subjects')
                ])
        .with('p', qb => {
          qb.select('publisher', 'id as publisher_id').from('publishers');
        })
        .with('avg', qb => {
          qb
            .select('book_id')
            .from('reviews')
            .avg({average: 'rating'})
            .groupBy(['book_id']);
        })
        .with('a', qb => {
          qb
            .select('authors.id as author_id', 'authors.name as author_name', 'books_authors.book_id')
            .from('books_authors')
            .join('authors', 'books_authors.author_id', 'authors.id')
            .distinct();
        })
        .with('s', qb => {
          qb
            .select('books_subjects.subject_id', 'subjects.name as subject_name', 'books_subjects.book_id')
            .from('books_subjects')
            .join('subjects', 'books_subjects.subject_id', 'subjects.id')
            .distinct();
        })
        .join('p', 'p.publisher_id', 'books.publisher_id')
        .leftJoin('avg', 'avg.book_id', 'books.id')
        .leftJoin('a', 'a.book_id', 'books.id')
        .leftJoin('s', 's.book_id', 'books.id')
        .groupBy(['id', 'publisher', 'a.author_id', 'avg.average']);
  if (id) {
    return Promise.all([
      query
        .where({'books.id': id})
        .first(),
      Reviews.getBy({'book_id': id}),
      Reviews.getBy({'book_id': id, 'user_id': user_id || 0}).first(),
    ]).then(([book, reviews, user_review]) => {
      if (book) {
        book.reviews = (reviews || null);
        book.user_review = (user_review || null);
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
    // .with('ba', qb => {
    //   qb.select('book_id', 'author_id').from('books_authors');
    // })
    // .join('ba', 'ba.book_id', 'books.id')
    .where({author_id});
}

function withSubject(subject_id) {
  return get()
    // .with('bs', qb => {
    //   qb.select('book_id', 'subject_id').from('books_subjects');
    // })
    // .join('bs', 'bs.book_id', 'books.id')
    .where({subject_id});
}

function getFeatured() {
  return get().where({featured: true});
}
