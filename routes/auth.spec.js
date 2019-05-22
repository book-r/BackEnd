const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js'),
      jwt = require('jsonwebtoken'),
      secrets = require('../secrets.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js');

beforeEach(done => prepBeforeEach(done));
describe('auth /api/auth', () => {
  describe('register /register', () => {
    const newUser = {username: 'test123123', password: 'test'};
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
    it('login existing user', async () => {
      const existingUser = {username: 'henry', password: 'test'};
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
      const newUser = {username: 'test98098', password: 'test'};
      const res = await request(server).post('/api/auth/register').send(newUser);
      console.log(res.status, res.body);
      const {body} = await request(server).post('/api/auth/login').send(newUser);
      const token = body.token;
      expect(jwt.verify(token, secrets.jwt));
      body.token = undefined;
      expect(body.username).toEqual(newUser.username);
    });
  });
});
