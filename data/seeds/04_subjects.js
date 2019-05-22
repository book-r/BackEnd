exports.seed = function(knex, Promise) {
  return knex('subjects').del()
    .then(() => knex('subjects').insert([
      {name: 'Physics'},
    ]))
    .then(() => knex('books_subjects').del())
    .then(() => knex('books_subjects').insert([
      {book_id: 1, subject_id: 1},
    ]));
};
