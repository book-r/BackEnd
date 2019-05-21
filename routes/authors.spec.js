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
      console.log("body", body);
      expect(body).toBe(200);
    });
  });
});
