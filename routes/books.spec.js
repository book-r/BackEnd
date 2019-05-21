const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js');

describe('books /api/books', () => {
  beforeEach(done => db.migrate.rollback()
             .then(() => db.migrate.latest())
             .then(() => db.seed.run())
             .then(() => done()));
  describe('get', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/books');
      expect(status).toBe(200);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/books');
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
      expect(body).toEqual(seed);
    });
  });

  describe('get by id', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/books/1');
      expect(status).toBe(200);
    });
    it('content', async () => {
      const {body} = await request(server).get('/api/books/1');
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
                     authors: [
                       {
                         id: 1,
                         name: "John R. Taylor",
                       },
                     ],
                     publisher: 'University Science Books',
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
      expect(body).toEqual(seed);
    });
    it('failure', async () => {
      const {status} = await request(server).get('/api/books/1231231');
      expect(status).toBe(404);
    });
  });
});
