// .env is kind of a mess. Make sure you have require('dotenv').config() at start of app

const config = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  PORT: process.env.dev_PORT || process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgresql://krill@localhost/oc',
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL ||
  //   'postgresql://',
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}

export = config