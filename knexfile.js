// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    
    connection: {
      host: 'localhost',
      port: '5432',
      user: 'postgres',
      password:process.env.PASS,
      database: 'list-api'
    },
    migrations: {
      directory: './db/migrations'
    }
  
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    }
   
  },
  testing: {
    client: 'pg',
    useNullAsDefault: true,
    
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'postgres',
      password:process.env.PASS,
      database: 'database_name'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};