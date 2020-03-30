import express from 'express'

const imagesRouter = express.Router()
const jsonBodyParser = express.json()

imagesRouter
  .route('/')
  .get((req, res, next) =>{
    res.json({'testing': 'imagesRouter'})
  })


  export default imagesRouter