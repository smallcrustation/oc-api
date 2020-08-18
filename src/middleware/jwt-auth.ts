import { JsonWebTokenError } from 'jsonwebtoken'
import { NextFunction } from 'express'
import AuthService from '../routes/auth/auth-service'

async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.get('Authorization') || '';
	let token;

	if (!authToken.toLowerCase().startsWith('bearer ')) {
		return res.status(401).json({ error: 'Missing bearer token' });
	}

	token = authToken.slice('bearer '.length, authToken.length);

	try {
		const payload = await AuthService.verifyJwt(token);
		const user = await AuthService.findByUsername(
			req.app.get('db'),
			payload.sub,
		);

		if (!user) {
			return res.status(401).json({ error: 'Unauthorized request' });
		}

		req.user = user;
		next();
	} catch (err) {
		const msg =
			err.message === 'jwt expired'
				? 'Session expired, please log back in'
				: 'Unauthorized request';
		res.status(401).json({ error: msg });
	}
};
}

export default requireAuth