import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {NODE_ENV} from './config'

import imagesRouter from './routes/images/images-router'
import authRouter from './routes/auth/auth-router'

const app = express() 

// morgan logger

// app.use(morgan)??
// *********  DON'T FORGET TO CHANGE THIS cors()**************
// app.use(cors({
//   origin: `http://localhost:3000`
// }));
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('OC API Home')
})

app.use('/api/images', imagesRouter)
app.use('/api/auth', authRouter)

// ERROR HANDLING
app.use((error: Error, req: Request , res: Response , next: NextFunction)=> {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

export = app