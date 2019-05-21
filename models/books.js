const db = require('../data/dbConfig.js'),
      Reviews = require('./reviews.js');

module.exports = {
  get,
};

function get(id) {
  const query = db('books').join('publishers', 'publishers.id', 'books.publisher_id');
  if (id) {
    return Promise.all([
      query.where({'books.id': id}).first(),
      Reviews.getBy({'book_id': id})
    ]).then(([book, reviews]) => {
      book && (book.reviews = reviews);
      return book;
    });
    return 
  } else {
    return query;
  }
}
