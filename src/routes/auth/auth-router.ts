import express from 'express'
import AuthService from './auth-service'
import requireAuth from '../../middleware/jwt-auth'

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .route('/login')
  .post(jsonBodyParser, async (req, res, next) => {
    const {username, password} = req.body;
    const loginUser = {username, password};
    
    for (const [key, value] of Object.entries(loginUser)) {
      if (!value) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }

    try {
      const user = await AuthService.findByUsername(req.app.get('db'), loginUser.username);
      if (!user) {
        return res.status(400).json({
          error: 'Incorrect username or password',
        });
      }

      const passwordsMatch = await AuthService.comparePasswords(loginUser.password, user.password);

      if (!passwordsMatch) {
        return res.status(400).json({
          error: 'Incorrect username or password',
        });
      }

      const sub = user.username;
      const payload: any = { user_id: user.id };
      res.send({
        authToken: AuthService.createJwt(sub, payload),
      });

      console.log('LOGGED IN BABY')
    } catch(err) {
      next(err);
    }
    
  })

  export default authRouter
  
