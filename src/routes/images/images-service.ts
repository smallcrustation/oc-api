import Knex from 'knex'
import cloudTypes, { v2 as cloudinary } from 'cloudinary'

type project = {
  name: string
  img_urls?: string[]
  description?: string
  address?: string
  architect?: string
}

const ImagesService = {
  // DATABASE SERVICES
  getAllProjects(db: Knex) {
    return db.from('projects').select('*')
  },

  getProjectByName(db: Knex, projectName: string) {
    return db.from('projects').select('*').where({ name: projectName })
  },

  // CLOUDINARY SERVICES
  async getProjectImageUrls(project: string) {
    try {
      let cloudinaryData = await cloudinary.search
        .expression(`folder:oc/projects/${project}`)
        // .sort_by('public_id', 'desc')
        .execute()

      let imgUrls: Array<string> = []

      for (let i = 0; i < cloudinaryData.resources.length; i++) {
        if (cloudinaryData.resources[i].url) {
          imgUrls.push(cloudinaryData.resources[i].url)
        }
      }

      // cloudinaryData.resources.forEach((img: cloudTypes.MetadataFieldApiResponse) => {
      //   console.log('here')
      //   imgUrls.push(img.url)
      // })

      return imgUrls
    } catch (e) {
      return e
    }
  },

  async getListProjectFolders() {
    try {
      let projectsFoldersList = await cloudinary.api.sub_folders('oc/projects')
      return projectsFoldersList.folders
    } catch (e) {
      return e
    }
  },

  insertProject(db: Knex, projectName: string, imgUrls: string[]) {
    console.log('##### -------- insertProject ---------- ####')
    console.log(projectName)
    return db('projects').insert({ name: projectName, 'img-urls': imgUrls })
  },

  updateProjectByName(db: Knex, projectName: string, imgUrls: string[]) {
    console.log('##### -------- updateProjectByName ---------- ####')
    console.log(projectName)
    return (
      db
        .from('projects')
        // .select('*')
        .where({ name: projectName })
        .update({ img_urls: imgUrls })
    )
  },

  async updateProjectsUrls(db: Knex) {
    try {
      const projectsList = await this.getListProjectFolders()
      // console.log(projectsList)
      console.log(db)

      for (let i = 0; i < projectsList.length; i++) {
        // get project names from Cloudinary
        let projectName = projectsList[i].name
        // get project images from Cloudinary
        let projectUrls = await this.getProjectImageUrls(projectName)
        // check if project exists already in db
        // let DBproject: Project = await db('projects').where({name: projectName})
        let DBproject = await this.getProjectByName(db, projectName)
        console.log('##### -------- HERE ---------- ####')
          // console.log(DBproject)
        // if project already exists update it
        if (DBproject.length > 0) {
          console.log('UPDATE')
          await this.updateProjectByName(db, projectName, projectUrls)
          // let updatedProject = await this.getProjectByName(db, projectName)
        } else {
          console.log('INSERT')
          await this.insertProject(db, projectName, projectUrls)
        }

        //  await this.updateProjectByName(db, projectName, projectUrls)
        // let updatedProject = await this.getProjectByName(db, projectName)
        // console.log(updatedProject)
      }
    } catch (e) {
      return e
    }
  },
}

export default ImagesService
