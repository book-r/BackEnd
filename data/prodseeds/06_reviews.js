exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(() => knex('reviews').insert([
      {rating: 5.0, comment: 'Good book!', user_id: 1, book_id: 1},
      {rating: 3.5, comment: 'Love the cover', user_id: 2, book_id: 1},
      {rating: 4.0, comment: 'Very interesting ideas.', user_id: 3, book_id: 2},
      {rating: 2.5, comment: 'Could use more words', user_id: 2, book_id: 2},
      {rating: 3.0, comment: 'Pretty decent', user_id: 3, book_id: 3},
      {rating: 4.5, comment: 'Could use more words', user_id: 2, book_id: 3},
      {rating: 3.5, comment: 'I liked it', user_id: 3, book_id: 4},
      {rating: 5.0, comment: 'So much better than Ohanian', user_id: 4, book_id: 5},
      {rating: 4.5, comment: 'You can google for the solution manual', user_id: 5, book_id: 4},
      {rating: 5.0, comment: 'I liked it so much I took the class twice!', user_id: 6, book_id: 5},
      {rating: 5.0, comment: 'You can google for the solution manual', user_id: 5, book_id: 5},
    ]));
};
