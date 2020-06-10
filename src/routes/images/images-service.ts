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

  updateProjectByName(db: Knex, project: project) {
    return (
      db
        .from('projects')
        // .select('*')
        .where({ name: project.name })
        .update({ img_urls: project.img_urls })
    )
  },

  insertProject(db: Knex, project: project) {
    return db
        .into('projects')
        .insert(project)
        .returning('*')
        .then(rows => {
          return rows[0];
        });
  },

  // postProject(db: Knex, project: project) {
  //   console.log('POST EVENT')
  //   return db
  //     .into('projects')
  //     .insert(project)
  //     .returning('*')
  //     .then(rows => {
  //       return rows[0];
  //     });
  // },

  async updateProjectsUrls(db: Knex) {
    try {
      // get project names from Cloudinary

      const projectsList = await this.getListProjectFolders()
      // console.log(projectsList)


      for (let i = 0; i < projectsList.length; i++) {
        let projectName = projectsList[i].name
        // get project URLS from Cloudinary
        let projectUrls = await this.getProjectImageUrls(projectName)

        let tempProject: project = await {name: projectName, img_urls: projectUrls}

        // check if project exists already in db
        let DBproject = await this.getProjectByName(db, projectName)
        // if project already exists update it
        if (DBproject.length > 0) {
          await this.updateProjectByName(db, tempProject)
          // let updatedProject = await this.getProjectByName(db, projectName)
        } else {
          await this.insertProject(db, tempProject)
          let newProject = await this.getProjectByName(db, projectName)
        }
      }
    } catch (e) {
      return e
    }
  },
}

export default ImagesService
