const db = require('../data/dbConfig.js');

module.exports = {
  getBy,
};

function getBy(whereObj) {
  // return db('reviews').where(whereObj);
  return db
    .select()
    .from('reviews')
    .with('b', qb => {
      qb.select('id', 'title').from('books')
    })
    .with('u', qb => {
      qb.select('id', 'username').from('users')
    })
    .join('b', 'b.id', 'reviews.book_id')
    .join('u', 'u.id', 'reviews.user_id')
    .where(whereObj);
}
