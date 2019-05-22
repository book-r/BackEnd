exports.seed = function(knex, Promise) {
  return knex('publishers').del()
    .then(() => knex('publishers').insert([
      {publisher: 'University Science Books'},
    ]));
};
