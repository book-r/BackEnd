const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getBy,
  insert,
  remove,
  update,
};


function get(id) {
  if (id) {
    return db('reviews').where({id}).first();
  } else {
    return db('reviews');
  }
}

function getBy(whereObj) {
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

function insert(review) {
  return db('reviews').insert(review, 'id').then(([id]) => get(id));
}

function update(id, changes) {
  return db('authors').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('reviews').where({id}).del();
}
