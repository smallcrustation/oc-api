import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Knex from 'knex'
import {JWT_SECRET, JWT_EXPIRY} from '../../config'

const AuthService = {

	findByUsername(db: Knex, username: string) {
		return db('oc_users')
			.where({ username })
			.first('*');
	},

	comparePasswords(loginPassword: string, savedPassword: string) {
		return bcrypt.compare(loginPassword, savedPassword);
	},

	createJwt(subject: string, payload: string) {
		return jwt.sign(payload, JWT_SECRET, {
			subject,
			expiresIn: JWT_EXPIRY,
			algorithm: 'HS256',
		});
	},

	verifyJwt(token: string) {
		return jwt.verify(token, JWT_SECRET, {
			algorithms: ['HS256'],
		});
  }
}

export default AuthService