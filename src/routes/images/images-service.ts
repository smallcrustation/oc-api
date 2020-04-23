import Knex from 'knex'
import cloudTypes, { v2 as cloudinary } from 'cloudinary'

const ImagesService = {
  getAllProjects(db: Knex) {
    return db.from('projects').select('*')
  },

  getProjectByName(db: Knex, projectName: string){
    return db
          .from('projects')
          .select('*')
          .where({name: projectName})
  },

  async getProjectImageUrls(project: string) {
    try {
      // console.log('getProjectImageUrls')
      let cloudinaryData = await cloudinary.search
        .expression(`folder:oc/${project}`)
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
      let projectsFoldersList = await cloudinary.api.sub_folders('oc')
      // console.log(projectsFoldersList.folders)
      return projectsFoldersList.folders
      
    } catch(e){
      return e
    }
  }
}

export default ImagesService
