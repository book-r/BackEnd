exports.seed = function(knex, Promise) {
  return knex('subjects').del()
    .then(() => knex('subjects').insert([
      {name: 'Physics'},
      {name: 'Philosophy'},
      {name: 'Cognitive Science'},
      {name: 'Mathematics'},
      {name: 'Statistics'},
    ]))
    .then(() => knex('books_subjects').del())
    .then(() => knex('books_subjects').insert([
      {book_id: 1, subject_id: 1},
      {book_id: 2, subject_id: 2},
      {book_id: 3, subject_id: 3},
      {book_id: 4, subject_id: 4},
      {book_id: 4, subject_id: 5},
      {book_id: 5, subject_id: 1},
    ]));
};
