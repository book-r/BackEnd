exports.seed = function(knex, Promise) {
  return knex('publishers').del()
    .then(() => knex('publishers').insert([
      {id: 1, name: 'University Science Books'},
    ]));
};
