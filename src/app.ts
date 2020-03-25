import express from 'express'
import cors from 'cors'
import helmet from 'helmet'


const app = express() 

// morgan logger

// app.use(morgan)??
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('yo')
})

export = app