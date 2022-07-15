import express from 'express'
import ImagesService from './images-service'

const imagesRouter = express.Router()
const jsonBodyParser = express.json()

// =================== CONSIDER THIS """PROJECTS ROUTE""" NOT JUST IMAGES =============================

// Project images are received through the file name they are held in on cloudinary
// this will list all the folders so you have all the project/folder names to get images from
imagesRouter.route('/project-folders').get(async (req, res, next) => {
  try {
    let projectFolders = await ImagesService.getListProjectFolders()
    // console.log(projectsList)
    res.status(200).json({ projectFolders }).end()
  } catch (e) {
    next(e)
  }
})

// fetch projects from db
imagesRouter.route('/projects').get(async (req, res, next) => {
  try {
    let projectsList = await ImagesService.getAllProjects(req.app.get('db'))
    console.log('======projectsList=====',projectsList)
    res.status(200).json({ projectsList }).end()
  } catch (e) {
    next(e)
  }
})

// update our DB 'projects' urls
imagesRouter.route('/update-project-urls').get(async (req, res, next) => {
  try {
    // save project urls to our database, from cloudinary data
    ImagesService.updateProjectsUrls(req.app.get('db'))
    res.status(200).json({ status: 'updated' }).end()
    return
  } catch (e) {
    next(e)
  }
})

imagesRouter
  .route('/update-project-info')
  .post(jsonBodyParser, async (req, res, next) => {
    // console.log(req.body)

    try {
      const {
        name,
        description,
        address,
        architect,
        prettyName,
        bedrooms,
        bathrooms,
        squareFootage,
        data1,
        data2,
        data3,
      } = req.body

      const projectReq = {
        name,
        description,
        address,
        architect,
        prettyName,
        bedrooms,
        bathrooms,
        squareFootage,
        data1,
        data2,
        data3,
      }

      // console.log(projectReq)
      // Change keys to match DB Columns, Prevents 'name' from being updated in DB from Client
      const projectCorrectKeys = {
        address: projectReq.address,
        architect: projectReq.architect,
        pretty_name: projectReq.prettyName,
        bedrooms: projectReq.bedrooms,
        bathrooms: projectReq.bathrooms,
        square_footage: projectReq.squareFootage,
        data_1: projectReq.data1,
        data_2: projectReq.data2,
        data_3: projectReq.data3
      }

      // GET THE PROJECT, to pass to service
      const getProject = await ImagesService.getProjectByName(req.app.get('db'), projectReq.name)

      //deconstruct/clean getProject into a clean object
      var DbProject = {...getProject[0]}

      // COMBINE PROJECT INFO
      const mergedProject = {...DbProject, ...projectCorrectKeys}
      // console.log('mergedProject: ', mergedProject)

      // save project urls to our database, from our input data ImageListItemProject
      await ImagesService.updateProjectInfoByName(req.app.get('db'), mergedProject)
      res.status(200).json({ status: 'updated' }).end()
      return
    } catch (e) {
      next(e)
    }
  })

// #### ------------------- MAKE OBSOLETE ------------------- ####

// imagesRouter
//   // get Project data from our db and cloudinary image urls
//   .route('/:projectName')
//   .get(async (req, res, next) => {
//     const projectName: string = req.params.projectName
//     try {
//       let imgUrls = await ImagesService.getProjectImageUrls(projectName)

//       const project = await ImagesService.getProjectByName(
//         req.app.get('db'),
//         projectName
//       )
//       return res.status(200).json({ project, imgUrls }).end()
//     } catch (e) {
//       next(e)
//     }
// })

export default imagesRouter
