exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('publishers', tbl => {
      tbl.increments();
      tbl.string('publisher')
        .notNullable()
        .unique();
    })
    .createTable('books', tbl => {
      tbl.increments();
      tbl
        .string('title')
        .notNullable();
      tbl
        .string('isbn')
        .notNullable()
        .unique();
      tbl
        .string('cover_url')
        .notNullable();
      tbl.string('description');
      tbl.string('edition');
      tbl
        .integer('year')
        .unsigned()
        .notNullable();
      tbl
        .integer('publisher_id')
        .notNullable()
        .references('id')
        .inTable('publishers')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl.timestamps();
      // tbl.unique([knex.raw('LOWER("title")'), 'edition'], 'unique_title_edition');
    })
    .raw('CREATE UNIQUE INDEX title_edition_unique on books (LOWER(title), edition);')
    .createTable('authors', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable()
        .unique();
    })
    .createTable('books_authors', tbl => {
      tbl.increments();
      tbl
        .integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('author_id')
        .notNullable()
        .references('id')
        .inTable('authors')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('subjects', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable()
        .unique();
    })
    .createTable('books_subjects', tbl => {
      tbl.increments();
      tbl
        .integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('subject_id')
        .notNullable()
        .references('id')
        .inTable('subjects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('users', tbl => {
      tbl.increments();
      tbl.timestamps();
      tbl
        .string('username')
        .notNullable()
        .unique();
      tbl
        .string('password')
        .notNullable();
    })
    .createTable('reviews', tbl => {
      tbl.increments();
      tbl
        .float('rating')
        .notNullable();
      tbl.string('comment');
      tbl
        .integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  ;
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('books')
    .dropTableIfExists('publishers')
    .dropTableIfExists('books_authors')
    .dropTableIfExists('authors')
    .dropTableIfExists('reviews')
    .dropTableIfExists('users')
    .dropTableIfExists('books_subjects')
    .dropTableIfExists('subjects');
};
