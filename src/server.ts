import app from './app'
import {PORT, HOST, DBPORT, DATABASE, USER, PASSWORD} from './config'
import knex from 'knex'
const cloudinary = require('cloudinary').v2

// CONNECT WITH DATABASE & SET IT AS AN EXPRESS VAR
const db = knex({
  client: 'pg',
  connection: {
    host: HOST,
    port: DBPORT,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
    debug: true,
    ssl: true // TURN THIS OFF IF USING LOCAL DB
  }
})

// ------ TESTS IF CONNECTED TO DATABASE ------
// db.raw("SELECT 1").then(() => {
//   console.log("PostgreSQL connected");
// })
// .catch((e) => {
//   console.log("PostgreSQL not connected");
//   console.error(e);
// });

app.set('db', db)

// CONNECT TO CLOUDINARY

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// START SERVER LISTENING LISTENING

app.listen(PORT, ()=> {
  console.log(`server listening on port http://localhost:${PORT}` )
})
