require('dotenv').config()


// -----TO EXPORT TO TEST DB (LOCAL)-----
if (process.env.NODE_ENV === 'development') {
  module.exports = {
    migrationDirectory: 'migrations',
    driver: 'pg',
    host: process.env.dev_DB_HOST,
    port: process.env.dev_DB_PORT,
    database: process.env.dev_DB_NAME,
    username: process.env.dev_DB_USER,
    password: process.env.dev_DB_PASS,
    ssl: true,
  }
}

//  ----TO EXPORT TO REAL DB (INTERNET)----
else {
  module.exports = {
    migrationDirectory: 'migrations',
    driver: 'pg',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: true,
  }
}
