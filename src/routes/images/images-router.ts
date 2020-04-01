import express from 'express'
import ImagesService from './images-service'

const imagesRouter = express.Router()
const jsonBodyParser = express.json()

imagesRouter.route('/').get(async (req, res, next) => {
  try {

    

    const projects = await ImagesService.getProjects(req.app.get('db'))
    res.json({ projects })
    next()
  } catch (e) {
    next(e)
  }
  // res.json({'testing': 'imagesRouter'})
})

export default imagesRouter
