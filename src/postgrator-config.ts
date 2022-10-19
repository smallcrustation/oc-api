require('dotenv').config()

// Postgrator is complicating migrations when I could just 
// use knex to migrate as well

// Had to edit package.json to make it migrate properly. 
// migrated down to 0 then back up to 2

// // -----TO EXPORT TO TEST DB (LOCAL)-----
// if (process.env.NODE_ENV === 'development') {
//   module.exports = {
//     migrationDirectory: 'migrations',
//     driver: 'pg',
//     host: process.env.dev_DB_HOST,
//     port: process.env.dev_DB_PORT,
//     database: process.env.dev_DB_NAME,
//     username: process.env.dev_DB_USER,
//     password: process.env.dev_DB_PASS,
//     // ssl: true, NO SSL FOR LOCAL ENVIRONMENT
//   }
// }

// // -----TO EXPORT TO DB (INTERNET)-----
// if (process.env.NODE_ENV === 'development') {
  module.exports = {
    migrationDirectory: 'migrations',
    driver: 'pg',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: { rejectUnauthorized: false } // SSL issues w pg8+ https://stackoverflow.com/questions/61785729/knex-heroku-error-self-signed-certificate
  }
// }
