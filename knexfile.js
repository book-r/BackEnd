require('dotenv').config();
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/dev.sqlite3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds',
    }
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds',
    }
  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/prodseeds',
    }
  },
};
