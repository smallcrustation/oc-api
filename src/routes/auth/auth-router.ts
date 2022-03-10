import express from 'express'
import AuthService from './auth-service'

const imagesRouter = express.Router()
const jsonBodyParser = express.json()

imagesRouter.route('/login').post(jsonBodyParser, async (req, res, next) => {
  try {
    const {username, password} = req.body
    const loginUser = {username, password}

    if(!loginUser.username || !loginUser.password){
      return res.status(400).json({
        error: `Missing '${!loginUser.username?'Username':'Password'}' in req body`
      })
    }

    const user = await AuthService.getUserWithUserName(req.app.get('db'), loginUser.username)
      if(!user){
        return res.status(400).json({
          error: 'Incorrect username or password'
        })
      }


  } catch (e) {
    next(e)
  }
})
