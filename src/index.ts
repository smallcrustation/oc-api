import app from './app'
import {PORT} from './config'
import knex from 'knex'

// const db = knex({
//   client: 'pg',
//   connection: DATABASE_URL
// })

// app.set(db)

app.listen(PORT, ()=> {
  console.log(`server listening on port ${PORT}` )
})