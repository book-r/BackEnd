exports.seed = function(knex, Promise) {
  return knex('authors').del()
    .then(() => knex('authors').insert([
      {name: 'John R. Taylor'},
    ]))
    .then(() => knex('books_authors').del())
    .then(() => knex('books_authors').insert([
      {book_id: 1, author_id: 1},
    ]));
};
