import express from 'express'
import UsersService, {NewUser} from './users-service'

const usersRouter = express.Router()
const jsonBodyParser = express.json()

interface Result {
  error: null | string
}

usersRouter.route('/')
  .post(jsonBodyParser, async (req, res, next) => {
  // get username, email, password. validate. hashPass. clean. insert. return.
  const { username, fullName, email, password } = req.body
  const newUser: NewUser = { username, fullName, email, password }

  try {
    // validate
    const validUserFields: Result | string = await UsersService.validateFields(
      req.app.get('db'),
      newUser
    )

    if (typeof validUserFields !== 'string' && validUserFields.error) {
        return res.status(400).json(validUserFields)
    }

    // hash pass
    newUser.password = await UsersService.hashPass(newUser.password)
    // sanitize 'xss'
    const cleanNewUser: any = UsersService.sanitizeUser(newUser)
    // insert
    const savedUser = await UsersService.insertUser(
      req.app.get('db'),
      cleanNewUser
    )

    res.status(200).json(savedUser)
  } catch (err) {
    next(err)
  }
}).get((req, res, next) => {
  console.log('/api/users')
})

export default usersRouter