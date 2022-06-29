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
    // console.log(projectsList)
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

imagesRouter.route('/update-project-info').post(async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      architect,
      pretty_name,
      bedrooms,
      bathrooms,
      square_footage,
      data_1,
      data_2,
      data_3,
    } = req.body

    const projectInfo = {
      name,
      description,
      address,
      architect,
      pretty_name,
      bedrooms,
      bathrooms,
      square_footage,
      data_1,
      data_2,
      data_3
    }

    // GET THE PROJECT, to pass to service
    const project = ImagesService.getProjectByName(req.app.get('db'), projectInfo.name)

    // COMBINE PROJECT INFO/UPDATE ETC...

    // save project urls to our database, from cloudinary data
    ImagesService.updateProjectInfoByName(req.app.get('db'), project) 
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
