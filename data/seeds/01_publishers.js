exports.seed = function(knex, Promise) {
  return knex('publishers').del()
    .then(() => knex('publishers').insert([
      {id: 1, publisher: 'University Science Books'},
    ]));
};
