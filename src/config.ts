require('dotenv').config() // don't forget you dont get you .env data without this

// All this is set do 'dev' should make conditional or just assume the
// .env being used is going to supply appropriate information.


const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  HOST: process.env.dev_DB_HOST,
  DBPORT: Number(process.env.dev_DB_PORT),
  DATABASE: process.env.dev_DB_NAME,
  USER: process.env.dev_DB_USER,
  PASSWORD: process.env.dev_DB_PASS,

  DATABASE_URL:
   process.env.DATABASE_URL || 'postgresql://krill@localhost/oc',

   JWT_SECRET: process.env.JWT_SECRET || 'secret',

   ADMIN_SECRET: process.env.ADMIN_SECRET,
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

