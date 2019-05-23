const db  = require('../data/dbConfig.js'),
      Books = require('./books.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js');

describe('books model', () => {
  beforeEach(done => prepBeforeEach(done));
  describe('get', () => {
    it('get all', async () => {
      const books = await Books.get();
      const seed = [ { id: 1,
                       title: 'Classical Mechanics',
                       isbn: '9781891389221',
                       cover_url: 'https://www.uscibooks.com/taycm.jpg',
                       description:
                       'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
                       average: 4.25,
                       edition: '1',
                       featured: true,
                       year: 2005,
                       publisher_id: 1,
                       created_at: null,
                       updated_at: null,
                       subjects: [{id: 1, name: 'Physics'}],
                       authors: [{id: 1, name: 'John R. Taylor'}],
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
                     average: 4.25,
                     edition: '1',
                     year: 2005,
                     featured: true,
                     publisher_id: 1,
                     created_at: null,
                     updated_at: null,
                     publisher: 'University Science Books',
                     subjects: [{id: 1, name: 'Physics'}],
                     authors: [{id: 1, name: 'John R. Taylor'}],
                     user_review: null,
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
    it('returns new book', async () => {
      const book = await Books.insert(newBook);
      const expectedBook = { ...newBook,
                             id: 2,
                             featured: null,
                             publisher: "University Science Books",
                             created_at: null,
                             updated_at: null,
                             average: null,
                             authors: null,
                             reviews: [],
                             subjects: null,
                             user_review: null,
                           };
      expect(book).toEqual(expectedBook);
    });
  });
  describe('withAuthor', () => {
    it('sucess', async () => {
      const books = await Books.withAuthor(1);
      expect(books).toEqual([{average: 4.25,
                              cover_url: "https://www.uscibooks.com/taycm.jpg",
                              created_at: null,
                              description: "John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.",
                              edition: "1",
                              id: 1,
                              isbn: "9781891389221",
                              publisher: "University Science Books",
                              publisher_id: 1,
                              featured: true,
                              title: "Classical Mechanics",
                              subjects: [{id: 1, name: 'Physics'}],
                              authors: [{id: 1, name: 'John R. Taylor'}],
                              updated_at: null,
                              year: 2005}]);
    });
  });
});
