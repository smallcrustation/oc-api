import app from './app'
import {PORT, DATABASE_URL} from './config'
import knex from 'knex'
const cloudinary = require('cloudinary').v2

// CONNECT WITH DATABASE & SET IT AS AN EXPRESS VAR

// console.log(DATABASE_URL)
const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: true
  }
})

app.set('db', db)

// CONNECT TO CLOUDINARY

require('dotenv').config();
// console.log('in route config')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// START SERVER LISTENING LISTENING

app.listen(PORT, ()=> {
  console.log(`server listening on port http://localhost:${PORT}` )
})
