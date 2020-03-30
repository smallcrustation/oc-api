import app from './app'
import {PORT, DATABASE_URL} from './config'
import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})

app.set('db', db)

app.listen(PORT, ()=> {
  console.log(`server listening on port http://localhost:${PORT}` )
})