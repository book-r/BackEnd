const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getBy,
  insert,
  remove,
  update,
};


function get(id) {
  const query = db
        .select('reviews.id', 'title', 'username', 'book_id', 'user_id', 'rating', 'comment')
        .from('reviews')
        .with('b', qb => {
          qb.select('id', 'title').from('books')
        })
        .with('u', qb => {
          qb.select('id', 'username').from('users')
        })
        .join('b', 'b.id', 'reviews.book_id')
        .join('u', 'u.id', 'reviews.user_id')
  if (id) {
    return query.where({'reviews.id': id}).first();
  } else {
    return query;
  }
}

function getBy(whereObj) {
  return get().where(whereObj);
}

function insert(review) {
  return db('reviews').insert(review, 'id').then(([id]) => get(id));
}

function update(id, changes) {
  return db('reviews').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('reviews').where({id}).del();
}
