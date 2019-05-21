const request = require('supertest'),
      server = require('../server.js'),
      db = require('../data/dbConfig.js');

it('test', () => {
  expect(1).toBe(1);
})
// describe.only('books /api/authors', () => {
//   beforeEach(done => db.migrate.rollback()
//              .then(() => {
//                db.migrate.latest()
//                  .then(() => {
//                    db.seed.run()
//                      .then(() => {
//                        done();
//                      });
//                  });
//              }));
// });
