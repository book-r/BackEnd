const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js'),
      restricted = require('../middleware/restricted.js');

jest.mock('../middleware/restricted.js');

describe('authors /api/authors', () => {
  beforeEach(done => prepBeforeEach(done));
  describe('get /', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/authors');
      expect(status).toBe(200);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/authors');
      expect(body).toEqual([{"id": 1, "name": "John R. Taylor"}]);
    });
  });
  describe('get /:id', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/authors/1');
      expect(status).toBe(200);
    });
    it('failure', async () => {
      const {status} = await request(server).get('/api/authors/12312313');
      expect(status).toBe(404);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/authors/1');
      expect(body).toEqual({ id: 1,
                             name: 'John R. Taylor',
                             books:
                             [ { id: 1,
                                 title: 'Classical Mechanics',
                                 isbn: '9781891389221',
                                 cover_url: 'https://www.uscibooks.com/taycm.jpg',
                                 description:
                                 'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
                                 edition: '1',
                                 year: 2005,
                                 featured: true,
                                 publisher_id: 1,
                                 created_at: null,
                                 updated_at: null,
                                 publisher: 'University Science Books',
                                 subjects: [{id: 1, name: 'Physics'}],
                                 authors: [{id: 1, name: 'John R. Taylor'}],
                                 average: 4.25 } ] });
    });
  });
  describe('put /:id', () => {
    const newAuthor = {name: 'Henry Blevins 2'};
    it('success', async () => {
      const {status} = await request(server).put('/api/authors/1').send(newAuthor);
      expect(status).toBe(200);
    });
    it('failure', async () => {
      const {status} = await request(server).put('/api/authors/12312313').send(newAuthor);
      expect(status).toBe(404);
    });
    it('modified author', async () => {
      const {body} = await request(server).put('/api/authors/1').send(newAuthor);

      expect(body).toEqual({...newAuthor, id: 1});
    });
  });
  describe('delete /:id', () => {
    const newAuthor = {name: 'Henry Blevins'};
    it('failure has books', async () => {
      const {status} = await request(server).delete('/api/authors/1');
      expect(status).toBe(500);
    });
    it('failure does not exist', async () => {
      const {status} = await request(server).delete('/api/authors/11231231');
      expect(status).toBe(404);

    });
    it('success', async () => {
      const {body} = await request(server).post('/api/authors').send(newAuthor);
      const {status} = await request(server).delete('/api/authors/' + body.id);
      expect(status).toBe(204);
    });
  });
  describe('post /', () => {
    it('success', async () => {
      const newAuthor = {name: 'Henry Blevins 123'};
      const {status} = await request(server).post('/api/authors/').send(newAuthor);
      expect(status).toBe(201);
    });
    it('returns new author', async () => {
      const newAuthor = {name: 'Henry Blevins 123123'};
      const {body} = await request(server).post('/api/authors/').send(newAuthor);
      body.id = undefined;
      expect(body).toEqual(newAuthor);
    });
  });
});
