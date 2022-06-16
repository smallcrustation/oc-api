import xss from 'xss'
import bcrypt from 'bcrypt'
import Knex from 'knex'
import { ADMIN_SECRET } from '../../config'

type NewUser = {
  secret?: string
  username: string
  password: string
}

type Result = {
  error?: string
}

const UsersService = {
  async validateFields(db: Knex, newUser: NewUser) {
    // prepare result obj
    let result: Result = {}

    // check for admin secret
    if (newUser.secret !== ADMIN_SECRET){
      return (result.error = `Incorrect Secret in response body`)
    }

    // https://effectivetypescript.com/2020/05/26/iterate-objects/
    let key: keyof typeof newUser
    for (key in newUser) {
      // check if data
      if (!newUser.username || !newUser.password) {
        return (result.error = `missing ${key} in response body`)
      }
      // check for whitespace
      if (newUser[key].startsWith(' ') || newUser[key].endsWith(' ')) {
        result.error = `${key} end or begin with spaces`
      }
    }

    //check if username already exists in db
    const userFound = await db('oc_users')
      .where('username', newUser.username)
      .select('*')
    if (userFound.length) {
      result.error = 'Username already exists'
    }

    // check password is at least 5 chars long and max 72
    if (newUser.password.length < 4 || newUser.password.length > 72) {
      // console.log(newUser.password.length)
      result.error = 'Password must be between 5 and 72 characters'
    }

    return result
  },

  hashPass(password: string) {
    return bcrypt.hash(password, 10)
  },

  sanitizeUser(newUser: NewUser){
    return {
      username: xss(newUser.username),
      password: xss(newUser.password) // what if pass looks like html...
    }
  },

  insertUser(db: Knex, newUser: NewUser){
    return db('oc_users')
      .insert(newUser)
      .returning('*')
  }

}

export default UsersService