const db = require('../data/dbConfig.js');

function prepBeforeEach(done) {
  db.migrate.rollback()
    .then(() => {
      db.migrate.latest()
        .then(() => {
          db.seed.run()
            .then(() => {
              done();
            });
        });
    });
}

module.exports = prepBeforeEach;
