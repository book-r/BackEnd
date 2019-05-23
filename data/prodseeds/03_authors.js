exports.seed = function(knex, Promise) {
  return knex('authors').del()
    .then(() => knex('authors').insert([
      {name: 'John R. Taylor'},
      {name: "Norman Melchert"},
      {name: "Jose Luis Bermufadez"},
      {name: "Jack Kiefer"},
      {name: "Gary Lorden"},
      {name: "David J. Griffiths"},
    ]))
    .then(() => knex('books_authors').del())
    .then(() => knex('books_authors').insert([
      {book_id: 1, author_id: 1},
      {book_id: 2, author_id: 2},
      {book_id: 3, author_id: 3},
      {book_id: 4, author_id: 4},
      {book_id: 4, author_id: 5},
      {book_id: 5, author_id: 6},
      {book_id: 6, author_id: 6},
    ]));
};
