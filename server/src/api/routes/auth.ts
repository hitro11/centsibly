import { logger } from '../../config/logger.js';
import {
	getAccessTokenController,
	getJwtController,
	getOauthRedirectUriController,
	refreshAccessTokenController,
} from '../controllers/auth.js';
import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.get('/get-oauth-code', async (req: Request, res: Response) => {
	const url = await getOauthRedirectUriController();
	res.json(url);
});

loginRoutes.get('/get-access-token', async (req: Request, res: Response) => {
	const code = req.query.code?.toString() ?? '';
	const state = req.query.state?.toString() ?? '';
	const accessToken = await getAccessTokenController(code, state);
	const { jwt, username } = await getJwtController(accessToken.access_token);
	res.json({ accessToken: accessToken, jwt, username })
});

loginRoutes.post(
	'/refresh-access-token',
	async (req: Request, res: Response) => {
		logger.debug('/refresh-access-token');
		const refreshToken = req.body.refreshToken ?? '';
		logger.debug({ refreshToken });
		const token = await refreshAccessTokenController(refreshToken);
		res.json(token ?? null);
	}
);

loginRoutes.post('/get-jwt', async (req: Request, res: Response) => {
	const accessToken = req.body?.accessToken ?? '';
	const authToken = await getJwtController(accessToken);
	res.json(authToken ?? null);
});

export default loginRoutes;
