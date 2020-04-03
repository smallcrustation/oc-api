import express from 'express'
import ImagesService from './images-service'
// const cloudinary = require('cloudinary').v2

const imagesRouter = express.Router()
const jsonBodyParser = express.json()

imagesRouter.route('/').get(async (req, res, next) => {
  try {
    // let cloudinaryData = await cloudinary.search
    //   .expression('folder:oc/highFlyer')
    //   // .sort_by('public_id', 'desc')
    //   .execute()

    // console.log(cloudinaryData)
    let imgUrls = await ImagesService.getProjectImageUrls()
    const projects = await ImagesService.getProjects(req.app.get('db'))
    // res.json({ projects, cloudinaryData })
    res.json({ imgUrls })
    // res.json({cloudinaryData})
    next()
  } catch (e) {
    next(e)
  }
  // res.json({'testing': 'imagesRouter'})
})

export default imagesRouter
