const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js');

describe('books /api/books', () => {
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
                       average: 4.25,
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
                     average: 4.25,
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
                     subjects: [
                       {
                         id: 1,
                         name: "Physics",
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

  describe('post', () => {
    const newBook = { id: 2,
                      title: 'Quantum Mechanics',
                      isbn: '9780131118928',
                      cover_url: 'http://covers.openlibrary.org/b/isbn/9780131118928-L.jpg',
                      description:
                      'A very good book for undergraduate quantum mechanics. What the.',
                      edition: '2',
                      year: 2004,
                      publisher_id: 1,
                    };
    it('success', async () => {
      const {status} = await request(server).post('/api/books/').send(newBook);
      expect(status).toBe(201);
    });
    it('returns new book', async () => {
      const {body} = await request(server).post('/api/books/').send(newBook);
      const expectedBook = { ...newBook,
                             id: 2,
                             publisher: "University Science Books",
                             average: null,
                             created_at: null,
                             updated_at: null,
                             authors: [],
                             reviews: [],
                             subjects: []
                           };
      expect(body).toEqual(expectedBook);
    });
  });
  describe('put', () => {
    const changes = { 
                      title: 'Better Title',
                      isbn: '9999999999999',
                    };
    it('success', async () => {
      const {status, body} = await request(server).put('/api/books/1').send(changes);
      expect(status).toBe(200);
    });
    it('failure', async () => {
      const {status, body} = await request(server).put('/api/books/11231231').send(changes);
      expect(status).toBe(404);
    });
    it('returns new book', async () => {
      const {body} = await request(server).put('/api/books/1').send(changes);
      const {title, isbn} = body;
      expect({title, isbn}).toEqual(changes);
    });
  });
  describe('delete', () => {
    const newBook = { title: 'Quantum Mechanics',
                      isbn: '9780131118928',
                      cover_url: 'http://covers.openlibrary.org/b/isbn/9780131118928-L.jpg',
                      description:
                      'A very good book for undergraduate quantum mechanics. What the.',
                      edition: '2',
                      year: 2004,
                      publisher_id: 1,
                    };
    it('success', async () => {
      const {status, body} = await request(server).post('/api/books/').send(newBook);
      expect(status).toBe(201);
      const res = await request(server).delete('/api/books/' + body.id);
      expect(res.status).toBe(204);
    });
    it('failure', async () => {
      const {status} = await request(server).delete('/api/books/11231231');
      expect(status).toBe(404);
    });
  });
});
