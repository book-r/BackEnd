exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {username: 'henry', password: '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'blevins', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
    ]))
    .then(() => knex('roles').del())
    .then(() => knex('roles').insert([
      {name: 'admin'}
    ]))
    .then(() => knex('users_roles').del())
    .then(() => knex('users_roles').insert([
      {user_id: 1, role_id: 1},
      {user_id: 2, role_id: 1},
    ]));
};
