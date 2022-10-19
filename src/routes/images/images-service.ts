import Knex from 'knex'
import cloudTypes, { v2 as cloudinary } from 'cloudinary'

type project = {
  name: string
  img_urls?: string[]
  description?: string
  address?: string
  architect?: string
  pretty_name?: string
  bedrooms?: string
  bathrooms?: string 
  square_footage?: string
  data_1?: string
  data_2?: string
  data_3?: string
}


const ImagesService = {
  // DATABASE SERVICES
  getAllProjects(db: Knex) {
    // console.log('=====IN getALlProjects=====')
    return db.from('projects').select('*')
  },

  // If Renamed on cloudinary will it add a project?
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
          imgUrls.push(cloudinaryData.resources[i].secure_url)
        }
      }

      return imgUrls
    } catch (e) {
      return e
    }
  },

  async getCommercialProjectImageUrls(project: string) {
    try {
      let cloudinaryData = await cloudinary.search
        .expression(`folder:oc/commercial-projects/${project}`)
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
      return projectsFoldersList.folders
    } catch (e) {
      return e
    }
  },

  async getListCommercialProjectFolders(){
    try{
      let commercialProjectsFoldersList = await cloudinary.api.sub_folders('oc/commercial-projects')
      return commercialProjectsFoldersList.folders

    } catch(e){
      return e
    }
  },

  // UPDATE IMAGE URLS ONLY
  updateProjectByName(db: Knex, project: project) {
    return (
      db
        .from('projects')
        // .select('*')
        .where({ name: project.name })
        .update({ img_urls: project.img_urls })
    )
  },

  updateProjectInfoByName(db: Knex, project: project) {
    // console.log("updateProjectInfoByName", project)
    return (
      db
        .from('projects')
        .where({ name: project.name })
        .update({ description: project.description,
          address: project.address,
          architect: project.architect,
          pretty_name: project.pretty_name,
          bedrooms: project.bedrooms,
          bathrooms: project.bathrooms,
          square_footage: project.square_footage,
          data_1: project.data_1,
          data_2: project.data_2,
          data_3: project.data_3
        })
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


  // ==== CHECKS CLOUDINARY FOR NEW UPLOADED PICTURES & INSERTS/UPDATES OUR DATABASE ===
  // 
  async updateProjectsUrls(db: Knex) {
    try {
      // get project names from Cloudinary
      // console.log('==== GET PROJECTS ====')

      const projectsList = await this.getListProjectFolders()

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
          // project does not exist make a new one
          await this.insertProject(db, tempProject)
          let newProject = await this.getProjectByName(db, projectName)
        }
      }

           // get COMMERCIAL project names from Cloudinary
          //  console.log('==== GET COMMERCIAL PROJECTS ====')
           const commercialProjectsList = await this.getListCommercialProjectFolders()
           for (let i = 0; i < commercialProjectsList.length; i++) {
             let projectName = commercialProjectsList[i].name
     
             // get project URLS from Cloudinary
             let projectUrls = await this.getCommercialProjectImageUrls(projectName)
     
             let tempProject: project = await {name: projectName, img_urls: projectUrls, data_3: 'commercial'}
     
             // check if project exists already in db
             let DBproject = await this.getProjectByName(db, projectName)
             // if project already exists update it
            //  console.log('===',DBproject,'===')
             if (DBproject.length > 0) {
               await this.updateProjectByName(db, tempProject)
               // let updatedProject = await this.getProjectByName(db, projectName)
             } else {
               // project does not exist make a new one
               await this.insertProject(db, tempProject)
              //  console.log(tempProject)
               let newProject = await this.getProjectByName(db, projectName)
             }
           }
    } catch (e) {
      return e
    }
  },
}

export default ImagesService
