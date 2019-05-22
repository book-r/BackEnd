exports.seed = function(knex, Promise) {
  return knex('reviews').truncate()
    .then(() => knex('users').del())
    .then(() => knex('books_subjects').del())
    .then(() => knex('subjects').del())
    .then(() => knex('books_authors').del())
    .then(() => knex('authors').del())
    .then(() => knex('books').del())
    .then(() => knex('publishers').del()) ;
};
