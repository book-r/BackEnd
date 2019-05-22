exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(() => knex('reviews').insert([
      {rating: 5.0, comment: 'Good book!', user_id: 1, book_id: 1},
      {rating: 3.5, comment: 'Love the cover', user_id: 2, book_id: 1},
    ]));
};
