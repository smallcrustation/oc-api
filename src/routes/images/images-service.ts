import Knex from 'knex'
import cloudTypes, { v2 as cloudinary } from 'cloudinary'

const ImagesService = {
  // DATABASE SERVICES
  getAllProjects(db: Knex) {
    return db.from('projects').select('*')
  },

  getProjectByName(db: Knex, projectName: string){
    return db
          .from('projects')
          .select('*')
          .where({name: projectName})
  },

  updateProjectByName(db: Knex, projectName: string, imgUrls: string[]){
    return db
    .from('projects')
    // .select('*')
    .where({name: projectName})
    .update({'img_urls': imgUrls})
  },

  // CLOUDINARY SERVICES
  async getProjectImageUrls(project: string) {
    try {
      // console.log('getProjectImageUrls')
      let cloudinaryData = await cloudinary.search
        .expression(`folder:oc/projects${project}`)
        // .sort_by('public_id', 'desc')
        .execute()

      // console.log('cloudinaryData')

      let imgUrls: Array<string> = []

      // console.log(cloudinaryData.resources.length)

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

  async getListProjectFolders(){
    try{
      let projectsFoldersList = await cloudinary.api.sub_folders('oc/projects')
      // console.log(projectsFoldersList.folders)
      return projectsFoldersList.folders
      
    } catch(e){
      return e
    }
  },

  async updateProjectsUrls(db: Knex){
    try{
      const projectsList = await this.getListProjectFolders()
      // console.log(projectsList)
      for(let i=0; i<projectsList.length; i++){
        // get project name
        let projectName = projectsList[i].name
        // console.log(projectName)
        let projectUrls = await this.getProjectImageUrls(projectName)
        // console.log(projectUrls)
         await this.updateProjectByName(db, projectName, projectUrls)
        let updatedProject = await this.getProjectByName(db, projectName)
        // console.log(updatedProject)
      }
    }catch(e){
      return e 
    }
  }
}

export default ImagesService
