const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getBy,
  insert,
  remove,
  update,
};

function get(id) {
  const query = db('users')
        .select('users.*', 'roles')
        .with('r', qb => {
          qb
            .select('users_roles.user_id', db.raw('json_agg(roles.name) as roles'))
            .from('users_roles')
            .leftJoin('roles', 'roles.id', 'users_roles.role_id')
            .groupBy(['users_roles.user_id']);
        })
        .leftJoin('r', 'r.user_id', 'users.id');
  if (id) {
    return query.where({id}).first();
  } else {
    return query;
  }
}

function getBy(whereObj) {
  return get().where(whereObj);
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
