require('dotenv').config() // don't forget you dont get you .env data without this

// All this is set do 'dev' should make conditional or just assume the 
// .env being used is going to supply appropriate information.
if (process.env.NODE_ENV === 'development')
{
  const port = process.env.CLIENT_ORIGIN 
}
process.env.NODE_ENV === 'production'
{

}




const config = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.dev_DB_HOST,
  DBPORT: Number(process.env.dev_DB_PORT),
  DATABASE: process.env.dev_DB_NAME,
  USER: process.env.dev_DB_USER,
  PASSWORD: process.env.dev_DB_PASS,
 
  DATABASE_URL:
   process.env.DB_URL || 'postgresql://krill@localhost/oc',
  
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL ||
  //   'postgresql://whatdo@localhost/whatdo_test',
  // JWT_SECRET: process.env.JWT_SECRET || 'whatdo-secret',
  // JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}


export = config;
