import { logger } from '../../config/logger.js';
import * as authController from '../controllers/auth.js';
import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.get('/get-oauth-code', async (req: Request, res: Response) => {
  const url = await authController.getOauthRedirectUri();
  res.json(url);
});

loginRoutes.get('/get-tokens', async (req: Request, res: Response) => {
  const code = req.query.code?.toString() ?? '';
  const state = req.query.state?.toString() ?? '';
  const accessToken = await authController.getAccessToken(code, state);
  const { authToken, username } = await authController.getAuthToken(
    accessToken.access_token
  );
  res.json({ accessToken, authToken, username });
});

loginRoutes.post('/refresh-tokens', async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken ?? '';
  const usernameQuery = req.body.username ?? '';
  const { accessToken } = await authController.refreshAccessToken(refreshToken);
  const { authToken, username } = await authController.getAuthToken(
    accessToken.access_token,
    usernameQuery
  );
  res.json({ accessToken, authToken, username });
});

loginRoutes.post('/get-jwt', async (req: Request, res: Response) => {
  const accessToken = req.body?.accessToken ?? '';
  const authToken = await authController.getAuthToken(accessToken);
  res.json(authToken ?? null);
});

export default loginRoutes;
