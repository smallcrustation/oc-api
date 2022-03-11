import express from 'express'
import AuthService from './auth-service'

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter.route('/login').post(jsonBodyParser, async (req, res, next) => {
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

      const passwordsMatch = await AuthService.comparePasswords(loginUser.password, user.password)
      if(!passwordsMatch){
        // console.log(passwordsMatch)
        return res.status(400).json({
          error: 'Incorrect username or password'
        })
      }

      const subject = user.username
      const payload = {user_id: user.id}
      res.send({
        authToken: AuthService.createJwt(subject, payload)
      })


  } catch (e) {
    next(e)
  }
})

export default authRouter