const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js'),
      restricted = require('../middleware/restricted.js');

jest.mock('../middleware/restricted.js');

describe('books /api/subjects', () => {
  beforeEach(done => prepBeforeEach(done));
  describe('get /', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/subjects');
      expect(status).toBe(200);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/subjects');
      expect(body).toEqual([{"id": 1, "name": "Physics"}]);
    });
  });
  describe('get /:id', () => {
    it('success', async () => {
      const {status} = await request(server).get('/api/subjects/1');
      expect(status).toBe(200);
    });
    it('failure', async () => {
      const {status} = await request(server).get('/api/subjects/12312313');
      expect(status).toBe(404);
    });
    it('contents', async () => {
      const {body} = await request(server).get('/api/subjects/1');
      expect(body).toEqual({ id: 1,
                             name: 'Physics',
                             books:
                             [ { id: 1,
                                 title: 'Classical Mechanics',
                                 isbn: '9781891389221',
                                 cover_url: 'https://www.uscibooks.com/taycm.jpg',
                                 description:
                                 'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',
                                 edition: '1',
                                 featured: true,
                                 year: 2005,
                                 publisher_id: 1,
                                 created_at: null,
                                 updated_at: null,
                                 subjects: [{id: 1, name: 'Physics'}],
                                 authors: [{id: 1, name: 'John R. Taylor'}],
                                 publisher: 'University Science Books',
                                 average: 4.25 } ] });
    });
  });
  describe('put /:id', () => {
    const newSubject = {name: 'New Subject'};
    it('success', async () => {
      const {status} = await request(server).put('/api/subjects/1').send(newSubject);
      expect(status).toBe(200);
    });
    it('failure', async () => {
      const {status} = await request(server).put('/api/subjects/12312313').send(newSubject);
      expect(status).toBe(404);
    });
    it('modified subject', async () => {
      const {body} = await request(server).put('/api/subjects/1').send(newSubject);

      expect(body).toEqual({...newSubject, id: 1});
    });
  });
  describe('delete /:id', () => {
    const newSubject = {name: 'New Subject'};
    it('failure has books', async () => {
      const {status} = await request(server).delete('/api/subjects/1');
      expect(status).toBe(500);
    });
    it('failure does not exist', async () => {
      const {status} = await request(server).delete('/api/subjects/11231231');
      expect(status).toBe(404);

    });
    it('success', async () => {
      const {body} = await request(server).post('/api/subjects').send(newSubject);
      const {status} = await request(server).delete('/api/subjects/' + body.id);
      expect(status).toBe(204);
    });
  });
  describe('post /', () => {
    const newSubject = {name: 'New Subject'};
    it('success', async () => {
      const {status} = await request(server).post('/api/subjects/').send(newSubject);
      expect(status).toBe(201);
    });
    it('returns new subject', async () => {
      const {body} = await request(server).post('/api/subjects/').send(newSubject);
      expect(body).toEqual({...newSubject, id: 2});
    });
  });
});
