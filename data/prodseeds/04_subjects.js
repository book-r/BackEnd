exports.seed = function(knex, Promise) {
  return knex('subjects').del()
    .then(() => knex('subjects').insert([
      // 1
      {name: 'Physics'},
      // 2
      {name: 'Philosophy'},
      // 3
      {name: 'Cognitive Science'},
      // 4
      {name: 'Mathematics'},
      // 5
      {name: 'Statistics'},
      // 6
      {name: 'Computer Science'},
      // 7
      {name: 'Clojure'},
      // 8
      {name: 'Lisp'},
      // 9
      {name: 'Writing'},
      // 10
      {name: 'Linear Algebra'},
    ]))
    .then(() => knex('books_subjects').del())
    .then(() => knex('books_subjects').insert([
      {book_id: 1, subject_id: 1},
      {book_id: 2, subject_id: 2},
      {book_id: 3, subject_id: 3},
      {book_id: 4, subject_id: 4},
      {book_id: 4, subject_id: 5},
      {book_id: 5, subject_id: 1},
      {book_id: 6, subject_id: 1},
      {book_id: 7, subject_id: 6},
      {book_id: 7, subject_id: 7},
      {book_id: 7, subject_id: 8},
      {book_id: 8, subject_id: 6},
      {book_id: 8, subject_id: 7},
      {book_id: 8, subject_id: 8},
      {book_id: 9, subject_id: 6},
      {book_id: 10, subject_id: 6},
      {book_id: 11, subject_id: 6},
      {book_id: 11, subject_id: 8},
      {book_id: 12, subject_id: 6},
      {book_id: 12, subject_id: 8},
      {book_id: 13, subject_id: 9},
      {book_id: 14, subject_id: 4},
      {book_id: 14, subject_id: 10},
      {book_id: 15, subject_id: 6},
    ]));
};
