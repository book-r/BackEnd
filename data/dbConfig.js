const knex = require('knex'),
      config = require('../knexfile.js');

module.exports = knex(config[process.env.DB_ENV || 'development']);
