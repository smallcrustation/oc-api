import Knex from 'knex'
import cloudTypes, { v2 as cloudinary } from 'cloudinary'

const ImagesService = {
  getProjects(db: Knex) {
    return db.from('projects').select('*')
  },

  async getProjectImageUrls(project?: string) {
    try {
      console.log('getProjectImageUrls')
      let cloudinaryData = await cloudinary.search
        .expression(`folder:oc/highFlyer`)
        // .sort_by('public_id', 'desc')
        .execute()
      
        console.log(cloudinaryData)

      let imgUrls

      cloudinaryData.forEach((img: cloudTypes.MetadataFieldApiResponse) => {
        console.log('here')
        imgUrls.push(img.url)
      })

      return cloudinaryData
    } catch (e) {
      return e
    }
  }
}

export default ImagesService
