exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {id: 1, username: 'henry', password: 'test'},
      {id: 2, username: 'blevins', password: 'other'},
    ]));
};
