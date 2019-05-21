exports.seed = function(knex, Promise) {
  return knex('authors').del()
    .then(() => knex('authors').insert([
      {id: 1, name: 'John R. Taylor'},
    ]))
    .then(() => knex('books_authors').del())
    .then(() => knex('books_authors').insert([
      {id: 1, book_id: 1, author_id: 1},
    ]));
};
