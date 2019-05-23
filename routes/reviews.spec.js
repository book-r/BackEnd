const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js'),
      restricted = require('../middleware/restricted.js');

jest.mock('../middleware/restricted.js');

describe('reviews /api/reviews', () => {
  beforeEach(done => prepBeforeEach(done));
  describe('get /api/reviews/', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/reviews/');
      expect(status).toEqual(200);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/reviews/');
      const seed = [ { id: 1,
                       rating: 5,
                       comment: 'Good book!',
                       book_id: 1,
                       title: 'Classical Mechanics',
                       user_id: 1,
                       username: 'henry'},
                     { id: 2,
                       rating: 3.5,
                       comment: 'Love the cover',
                       book_id: 1,
                       title: 'Classical Mechanics',
                       user_id: 2,
                       username: 'blevins' } ];
      expect(body).toEqual(seed);
    });
    it('get by user_id', async () => {
      const {body} = await request(server).get('/api/reviews/?user_id=1');
      const seed =  [{ id: 1,
                       rating: 5,
                       comment: 'Good book!',
                       book_id: 1,
                       title: 'Classical Mechanics',
                       user_id: 1,
                       username: 'henry'}];
      expect(body).toEqual(seed);
    });
  });
  describe('post /api/reviews/', () => {
    // jest.mock('../middleware/restricted.js', () => (req, res, next) => req.token = {user_id: 2} );
    const newReview = {rating: 4.6, comment: 'It was pretty good', book_id: 1};
    const expectedReview = {...newReview, user_id: 3, title: 'Classical Mechanics', username:  'test123123asdasd'};
    it('success', async () => {
      const newUser = {username: 'asldjkalskdj', password: 'test'};
      const res = await request(server).post('/api/auth/register').send(newUser);
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 3};
        next();
      });
      const {status} = await request(server).post('/api/reviews/').send(newReview);
      expect(status).toEqual(201);
    });
    it('contents', async () => {
      const newUser = {username: 'test123123asdasd', password: 'test'};
      const res = await request(server).post('/api/auth/register').send(newUser);
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 3};
        next();
      });
      const {body} = await request(server).post('/api/reviews/').send(newReview);
      delete body.id;
      expect(body).toEqual(expectedReview);
    });
  });
  describe('get by id', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/reviews/1');
      expect(status).toEqual(200);
    });
    it('failure', async () => {
      const {status} = await request(server).get('/api/reviews/123123123');
      expect(status).toEqual(404);
    });
    it('contents', async () => {
      const seed = {book_id: 1,
                    user_id: 1,
                    id: 1,
                    rating: 5,
                    comment: 'Good book!',
                    title: 'Classical Mechanics',
                    username: 'henry'};
      const {body} = await request(server).get('/api/reviews/1');
      expect(body).toEqual(seed);
    });
  });
  describe('put by id', () => {
    const newReview = {rating: 4.6, comment: 'It was pretty good'};
    const expectedReview = {...newReview, book_id: 1, user_id: 1, id: 1, title: 'Classical Mechanics', username: 'henry'};
    it('success', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {status} = await request(server).put('/api/reviews/1').send(newReview);
      expect(status).toEqual(200);
    });
    it('failure', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {status} = await request(server).put('/api/reviews/123123123').send(newReview);
      expect(status).toEqual(404);
    });
    it('contents', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {body} = await request(server).put('/api/reviews/1').send(newReview);
      expect(body).toEqual(expectedReview);
    });
    it('failure other users comment', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 20};
        next();
      });
      const {status} = await request(server).put('/api/reviews/1').send(newReview);
      expect(status).toBe(403);
    });
  });
  describe('delete by id', () => {
    it('success', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {status} = await request(server).delete('/api/reviews/1');
      expect(status).toEqual(204);
    });
    it('failure', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 1};
        next();
      });
      const {status} = await request(server).delete('/api/reviews/123123123');
      expect(status).toEqual(404);
    });
    it('failure other users comment', async () => {
      restricted.mockImplementation((req, res, next) => {
        req.token = {id: 20};
        next();
      });
      const {status} = await request(server).delete('/api/reviews/1');
      expect(status).toEqual(403);
    });
  });
});
