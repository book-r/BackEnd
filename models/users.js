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
    return db('users').where({id}).first();
  } else {
    return db('users');
  }
}

function getBy(whereObj) {
  return db('users').where(whereObj);
}

function insert(user) {
  return db('users').insert(user, 'id').then(([id]) => get(id));
}

function update(id, changes) {
  return db('users').where({id}).update(changes).then(updated => updated ? get(id) : null);
}

function remove(id) {
  return db('users').where({id}).del();
}
