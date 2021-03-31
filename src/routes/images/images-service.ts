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

// ------------------------ PROBLEM --------------------------------------
  getProjectByName(db: Knex, projectName: string) {
    console.log('GET PROJECT BY NAME')
    return db.from('projects').select('*').where({ name: projectName }).returning('*').then(console.log)
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
          imgUrls.push(cloudinaryData.resources[i].secure_url)
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
      console.log('GET LIST PROJECT FOLDERS')
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

      // console.log(db)
      const projectsList = await this.getListProjectFolders()
      // console.log(projectsList.length)
      for (let i = 0; i < projectsList.length; i++) {
        // console.log(projectsList)
        
        let projectName = projectsList[i].name
        // console.log(i, ' THIS IS A PROJECT NAME --:', projectName)
        // get project URLS from Cloudinary
        let projectUrls = await this.getProjectImageUrls(projectName)
        // console.log(i, ' THIS IS A PROJECT URLS --:', projectUrls)

        let tempProject: project = await {name: projectName, img_urls: projectUrls}
        console.log(i, ' THIS IS TEMP PROJECT --:', tempProject)

        // ------------------------ PROBLEM --------------------------------------
        // check if project exists already in db
        let DBproject = await this.getProjectByName(db, projectName)

        // ------------------------- NOT GETTING HERE ----------------------------
        // if project already exists update it
        console.log('DB PROJECT LENGTH: ', DBproject.length)
        if (DBproject.length > 0) {
          console.log('UPDATE PROJECT BY NAME')
          await this.updateProjectByName(db, tempProject)
          // let updatedProject = await this.getProjectByName(db, projectName)
        } else {
          console.log('INSERT PROJECT')
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
