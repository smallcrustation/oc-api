import {ADMIN_SECRET} from '../../config'
import express from 'express'
import UsersService from './users-service'
import { contentSecurityPolicy } from 'helmet'

const usersRouter = express.Router()
const jsonBodyParser = express.json()

interface NewUser{
  username: string
  password: string
  secret?: string
}

type CleanNewUser = {
  username: string
  password: string
}

usersRouter.route('/')
  .post(jsonBodyParser, async (req, res, next) => {
  // get username, email, password. validate. hashPass. clean. insert. return.
  const { secret, username, password } = req.body
  const newUser = { username, password, secret }

  try {
    // validate 
    const validUserFields = await UsersService.validateFields(req.app.get('db'), newUser)
    // hash pass
    newUser.password = await UsersService.hashPass(newUser.password)
    // remove secret b/c we don't want it in DB
    delete newUser.secret
    // sanitize 'xss'
    const cleanNewUser: CleanNewUser = UsersService.sanitizeUser(newUser)
    // insert 
    const savedUser = await UsersService.insertUser(req.app.get('db'), cleanNewUser)

    res.status(200).json(savedUser)

  } catch (err) {
    next(err)
  }
})

export default usersRouter