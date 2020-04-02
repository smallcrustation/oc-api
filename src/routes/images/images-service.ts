import Knex from "knex"

const ImagesService = {
  getProjects(db: Knex){
    return db
      .from('projects')
      .select('*')
  }
  
}

export default ImagesService