const db  = require('../data/dbConfig.js');
const Books = require('./books.js');

describe('books model', () => {
  beforeEach(done => db.migrate.rollback()
             .then(() => {
               db.migrate.latest()
                 .then(() => {
                   db.seed.run()
                     .then(() => {
                       done();
                     });
                 });
             }));
  describe('get', () => {
    it('get all', async () => {
      const books = await Books.get();
      const seed = [ { id: 1,
                       title: 'Classical Mechanics',
                       isbn: '9781891389221',
                       cover_url: 'https://www.uscibooks.com/taycm.jpg',
                       description:
                       'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
                       edition: '1',
                       year: 2005,
                       publisher_id: 1,
                       created_at: null,
                       updated_at: null,
                       publisher: 'University Science Books' } ];
      expect(books).toEqual(seed);
    });
    it('get by id', async () => {
      const book = await Books.get(1);
      const seed = { id: 1,
                     title: 'Classical Mechanics',
                     isbn: '9781891389221',
                     cover_url: 'https://www.uscibooks.com/taycm.jpg',
                     description:
                     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
                     edition: '1',
                     year: 2005,
                     publisher_id: 1,
                     created_at: null,
                     updated_at: null,
                     publisher: 'University Science Books',
                     authors: [
                       {
                         id: 1,
                         name: "John R. Taylor",
                       },
                     ],
                     subjects: [
                       {
                         id: 1,
                         name: "Physics",
                       },
                     ],
                     reviews:
                     [ { id: 1,
                         rating: 5,
                         comment: 'Good book!',
                         book_id: 1,
                         user_id: 1,
                         title: 'Classical Mechanics',
                         username: 'henry' },
                       { id: 2,
                         rating: 3.5,
                         comment: 'Love the cover',
                         book_id: 1,
                         user_id: 2,
                         title: 'Classical Mechanics',
                         username: 'blevins' } ] };
      expect(book).toEqual(seed);
    });
  });
  describe('insert', () => {
    const newBook = { title: 'Quantum Mechanics',
                      isbn: '9780131118928',
                      cover_url: 'http://covers.openlibrary.org/b/isbn/9780131118928-L.jpg',
                      description:
                      'A very good book for undergraduate quantum mechanics. What the.',
                      edition: '2',
                      year: 2004,
                      publisher_id: 1,
                    };
    const newBook2 = { title: 'Quantum Mechanics 2',
                      isbn: '97801311189282',
                      cover_url: 'http://covers.openlibrary.org/b/isbn/9780131118928-L.jpg',
                      description:
                      'A very good book for undergraduate quantum mechanics. What the.',
                      edition: '2',
                      year: 2004,
                      publisher_id: 1,
                    };
    it('returns new book', async () => {
      const book = await Books.insert(newBook);
      const expectedBook = { ...newBook,
                             id: 2,
                             publisher: "University Science Books",
                             created_at: null,
                             updated_at: null,
                             authors: [],
                             reviews: [],
                             subjects: []
                           };
      expect(book).toEqual(expectedBook);
    });
  });
});
