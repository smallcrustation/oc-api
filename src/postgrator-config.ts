require('dotenv').config();

//  ----TO EXPORT TO REAL DB (INTERNET)----
// module.exports = {
//   migrationDirectory: "migrations",
//   driver: "pg",
//   host: process.env.MIGRATION_DB_HOST,
//   port: process.env.MIGRATION_DB_PORT,
//   database: process.env.MIGRATION_DB_NAME,
//   username: process.env.MIGRATION_DB_USER,
//   password: process.env.MIGRATION_DB_PASS,
//   ssl: true
// }

// -----TO EXPORT TO TEST DB (LOCAL)-----
module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  host: process.env.dev_MIGRATION_DB_HOST,
  port: process.env.dev_MIGRATION_DB_PORT,
  database: process.env.dev_MIGRATION_DB_NAME,
  username: process.env.dev_MIGRATION_DB_USER,
  password: process.env.dev_MIGRATION_DB_PASS,
  ssl: true
}

