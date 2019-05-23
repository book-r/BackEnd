exports.seed = function(knex, Promise) {
  return knex('books').del()
    .then(() => knex('books').insert([
      {
        title: 'Classical Mechanics',
        isbn: '9781891389221',
        cover_url: 'https://www.uscibooks.com/taycm.jpg',
        publisher_id: 1,
        edition: "1",
        featured: true,
        year: 2005,
        description: "John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text."
      },
    ]));
};
