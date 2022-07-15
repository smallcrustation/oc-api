require('dotenv').config() // don't forget you dont get you .env data without this

// All this is set do 'dev' should make conditional or just assume the
// .env being used is going to supply appropriate information.


const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  HOST: process.env.HOST,
  DBPORT: Number(process.env.PORT),
  DATABASE: process.env.DBNAME,
  USER: process.env.DBUSER,
  PASSWORD: process.env.PASSWORD,

  DATABASE_URL:
   process.env.DB_URL || 'postgresql://krill@localhost/oc',

   JWT_SECRET: process.env.JWT_SECRET || 'secret',

   ADMIN_SECRET: process.env.ADMIN_SECRET,

  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL ||
  //   'postgresql://whatdo@localhost/whatdo_test',
  // JWT_SECRET: process.env.JWT_SECRET || 'whatdo-secret',
  // JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}

export = config


// development: {
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   PORT: process.env.PORT || 8000,
//   HOST: process.env.dev_DB_HOST,
//   DBPORT: Number(process.env.dev_DB_PORT),
//   DATABASE: process.env.dev_DB_NAME,
//   USER: process.env.dev_DB_USER,
//   PASSWORD: process.env.dev_DB_PASS,
// },
// production: {
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   PORT: process.env.PORT || 8000,
//   HOST: process.env.DB_HOST,
//   DBPORT: Number(process.env.DB_PORT),
//   DATABASE: process.env.DB_NAME,
//   USER: process.env.DB_USER,
//   PASSWORD: process.env.DB_PASS,
// },