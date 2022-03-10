import {JWT_SECRET} from '../../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Knex from 'knex'

type user = {
  username: string
  password: string
}

const authService = {
  getUserWithUserName(db: Knex, username: string) {
    // console.log('USERNAME: ', username)
    // return db('projector_users')
    //   .where({ username })
    //   .first('*')
    return db('projector_users')
      .whereRaw(`LOWER(username) LIKE LOWER('${username}')`)
      .first('*')
  },

  comparePasswords(LoginUserPass: string, dbUserPass: string) {
    // console.log('LoginUserPass: ', LoginUserPass)
    // console.log('dbUserPass: ', dbUserPass)
    return bcrypt.compare(LoginUserPass, dbUserPass)
  },

  createJwt(subject: string, payload: string) {
    return jwt.sign(payload, JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    })
  },

  verifyJwt(token: string) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256']
    })
  }
}

export default authService
