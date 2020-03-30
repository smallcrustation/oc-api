import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import imagesRouter from './routes/images/images-router'

const app = express() 

// morgan logger

// app.use(morgan)??
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Home')
})

app.use('/api/images', imagesRouter)

export = app