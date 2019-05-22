const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      jwt = require('jsonwebtoken'),
      secrets = require('../secrets.js');

describe('auth /api/auth', () => {
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
  describe('register /register', () => {
    const newUser = {username: 'test', password: 'test'};
    it('register user', async () => {
      const {body} = await request(server).post('/api/auth/register').send(newUser);
      const token = body.token;
      expect(jwt.verify(token, secrets.jwt));
      body.token = undefined;
      expect(body.username).toEqual(newUser.username);
    });
    it('error', async () => {
      const {status} = await request(server).post('/api/auth/register').send({username: 'abc'});
      expect(status).toEqual(400);
    });
  });
  describe('login /login', () => {
    const existingUser = {username: 'henry', password: 'test'};
    const newUser = {username: 'test', password: 'test'};
    it('login existing user', async () => {
      const {body} = await request(server).post('/api/auth/login').send(existingUser);
      const token = body.token;
      expect(jwt.verify(token, secrets.jwt));
      body.token = undefined;
      expect(body.username).toEqual(existingUser.username);
    });
    it('error', async () => {
      const {status} = await request(server).post('/api/auth/login').send({username: 'abc'});
      expect(status).toEqual(400);
    });
    it('login new user', async () => {
      await request(server).post('/api/auth/register').send(newUser);
      const {body} = await request(server).post('/api/auth/login').send(newUser);
      console.log("asd", body);
      const token = body.token;
      expect(jwt.verify(token, secrets.jwt));
      body.token = undefined;
      expect(body.username).toEqual(newUser.username);
    });
  });
});
