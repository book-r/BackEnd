exports.seed = function(knex, Promise) {
  return knex('reviews').truncate()
    .then(() => knex('users').truncate())
    .then(() => knex('books_subjects').truncate())
    .then(() => knex('subjects').truncate())
    .then(() => knex('books_authors').truncate())
    .then(() => knex('authors').truncate())
    .then(() => knex('books').truncate())
    .then(() => knex('publishers').truncate()) ;
};
