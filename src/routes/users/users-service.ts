import bcrypt from 'bcryptjs'
import xss from 'xss'
import knex from 'knex'
import Knex from 'knex'

interface Result {
  error: null | string
}

export interface NewUser {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

// export interface CleanNewUser {
//   username: string
//   full_name: string
//   // fullName?: null
//   email: string
//   password: string
// }

const UsersService = {
  async validateFields(db: knex, newUser: NewUser) {
    // prepare result obj
    const result: Result = { error: null }

    // for (let key in newUser) {
    //   // check if data
    //   if (!newUser.username || !newUser.email || !newUser.password) {
    //     return (result.error = `missing ${key} in response body`)
    //   }
    //   // check for whitespace
    //   if (newUser[key].startsWith(' ') || newUser[key].endsWith(' ')) {
    //     result.error = `${key} end or begin with spaces`
    //   }
    // }

    // ensure all fields are filled out & no fields start or end with spaces
    for (const [key, value] of Object.entries(newUser)) {
      
      if (!newUser.username || !newUser.email || !newUser.password) {
        return (result.error = `missing ${key} in response body`)
      }

      if (value.startsWith(' ') || value.endsWith(' ')) {
        result.error = `${key} cannot start or end with spaces`
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

  // sanitizes user and adds NewUser
  sanitizeUser(newUser: NewUser) {

    const cleanNewUser= {
      username: xss(newUser.username),
      first_name: xss(newUser.firstName),
      last_name: xss(newUser.lastName),
      email: xss(newUser.email),
      password: xss(newUser.password), // what if pass looks like html...
    }

    return cleanNewUser
    // return {
    //   username: xss(newUser.username),
    //   full_name: xss(newUser.fullName),
    //   email: xss(newUser.email),
    //   password: xss(newUser.password), // what if pass looks like html...
    // }
  },

  insertUser(db: Knex, newUser: NewUser) {
    return db('oc_users').insert(newUser).returning('*')
  },
}

export default UsersService
