exports.seed = function(knex, Promise) {
  return knex('publishers').del()
    .then(() => knex('publishers').insert([
      // 1
      {publisher: 'University Science Books'},
      // 2
      {publisher: "Oxford University Press"},
      // 3
      {publisher:  "Springer-Verlag"},
      // 4
      {publisher:  "lulu.com"},
      // 5
      {publisher:  "Pragmatic Bookshelf"},
      // 6
      {publisher:  "MIT Press"},
      // 7
      {publisher:  "CareerCup"},
      // 8
      {publisher:  "Pearson"},
      // 9
      {publisher:  "Wellesley-Cambridge Press"},
      // 10
      {publisher:  "O'Reilly Media"},
    ]));
};
