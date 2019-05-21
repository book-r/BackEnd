const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js');

describe('books /api/authors', () => {
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
      expect(body).toEqual({"id": 1, "name": "John R. Taylor"});
    });
  });
  describe('put /:id', () => {
    const newAuthor = {name: 'Henry Blevins'};
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
  describe.only('delete /:id', () => {
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
    const newAuthor = {name: 'Henry Blevins'};
    it('success', async () => {
      const {status} = await request(server).post('/api/authors/').send(newAuthor);
      expect(status).toBe(201);
    });
    it('returns new author', async () => {
      const {body} = await request(server).post('/api/authors/').send(newAuthor);
      expect(body).toEqual({...newAuthor, id: 2});
    });
  });
});
