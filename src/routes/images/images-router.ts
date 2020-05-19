import express from 'express'
import ImagesService from './images-service'
// const cloudinary = require('cloudinary').v2

const imagesRouter = express.Router()
const jsonBodyParser = express.json()


// Project images are received through the file name they are held in on cloudinary
// this will list all the folders so you have all the project/folder names to get images from
imagesRouter.route('/project-folders').get(async (req, res, next) => {
  try {
    let projectsList = await ImagesService.getListProjectFolders()
    // console.log(projectsList)
    res.json({projectsList}).end()
    
    
  } catch (e) {
    next(e)
  }
}) 

// fetch from cloudinary api project URLS
imagesRouter.route('/set-project-urls').get(async (req, res, next) => {
  try {
    // call on cloudinary api from images-service
    ImagesService.updateProjectsUrls(req.app.get('db'))
    // save project urls to our database

  } catch (e) {
    next(e)
  }
}) 

imagesRouter
// get Project data from our db and cloudinary image urls
.route('/:projectName').get(async (req, res, next) => {
  const projectName: string = req.params.projectName
  try {
    let imgUrls = await ImagesService.getProjectImageUrls(projectName)

    const project = await ImagesService.getProjectByName(req.app.get('db'), projectName)
    return res.status(200).json({ project, imgUrls }).end()

   
  } catch (e) {
    next(e)
  }
})



export default imagesRouter
