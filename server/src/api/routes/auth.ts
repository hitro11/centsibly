import { logger } from '../../config/logger.js';
import {
  getAccessTokenController as getTokensController,
  getJwtController,
  getOauthRedirectUriController,
  refreshAccessTokenController as refreshTokensController,
} from '../controllers/auth.js';
import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.get('/get-oauth-code', async (req: Request, res: Response) => {
  const url = await getOauthRedirectUriController();
  res.json(url);
});

loginRoutes.get('/get-tokens', async (req: Request, res: Response) => {
  const code = req.query.code?.toString() ?? '';
  const state = req.query.state?.toString() ?? '';
  const accessToken = await getTokensController(code, state);
  const { authToken, username } = await getJwtController(
    accessToken.access_token
  );
  res.json({ accessToken, authToken, username });
});

loginRoutes.post('/refresh-tokens', async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken ?? '';
  const usernameQuery = req.body.username ?? '';
  const { accessToken } = await refreshTokensController(refreshToken);
  const { authToken, username } = await getJwtController(
    accessToken.access_token,
    usernameQuery
  );
  res.json({ accessToken, authToken, username });
});

loginRoutes.post('/get-jwt', async (req: Request, res: Response) => {
  const accessToken = req.body?.accessToken ?? '';
  const authToken = await getJwtController(accessToken);
  res.json(authToken ?? null);
});

export default loginRoutes;
