const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js'),
      restricted = require('../middleware/restricted.js'),
      setToken = require('../middleware/setToken.js');

jest.mock('../middleware/restricted.js');
jest.mock('../middleware/setToken.js');

describe('books /api/books', () => {
  beforeEach(done => prepBeforeEach(done));
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
                       featured: true,
                       year: 2005,
                       publisher_id: 1,
                       created_at: null,
                       updated_at: null,
                       subjects: [{id: 1, name: 'Physics'}],
                       authors: [{id: 1, name: 'John R. Taylor'}],
                       publisher: 'University Science Books' } ];
      expect(body).toEqual(seed);
    });
  });

  describe('get by id', () => {
    const seed = { id: 1,
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
                   publisher: 'University Science Books',
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
    it('success', async () => {
      const {status} = await request(server).get('/api/books/1');
      expect(status).toBe(200);
    });
    it('content', async () => {
      const {body} = await request(server).get('/api/books/1');
      expect(body).toEqual(seed);
    });
    it('content with user_rating', async () => {
      setToken.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {body} = await request(server).get('/api/books/1');
      expect(body).toEqual({...seed,
                            user_review: {
                              book_id: 1,
                              comment: "Good book!",
                              id: 1,
                              rating: 5,
                              title: "Classical Mechanics",
                              user_id: 1,
                              username: "henry",
                            }});
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
                             featured: null,
                             average: null,
                             created_at: null,
                             updated_at: null,
                             authors: null,
                             reviews: [],
                             subjects: null,
                             user_review: null,
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
    restricted.mockImplementation((req, res, next) => {
      req.token = {id: 1, roles: ['admin']};
      next();
    });
    const newBook = { title: 'Quantum Mechanics 100',
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
