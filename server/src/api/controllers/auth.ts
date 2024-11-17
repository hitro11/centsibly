import { logger } from '../../config/logger.js';
import * as authService from '../services/authentication.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getProfileData } from '../services/reddit/profile.js';
dotenv.config();

export async function getOauthRedirectUri() {
  return await authService.getOauthCodeUrl();
}

export async function getAccessToken(code: string, state: string) {
  const urlInfo = await authService.generateAccessTokenInfo(code, state);
  const accessToken = await authService.getAccessToken(
    urlInfo.url,
    urlInfo.body
  );
  accessToken.expiry = Date.now() + accessToken.expires_in * 1000;
  return accessToken;
}

export async function getAuthToken(
  accessToken: string,
  username: string = ''
): Promise<{ authToken: string; username: string }> {
  if (!username) {
    const profileData = await getProfileData(accessToken);
    username = profileData.name;
  }

  const authToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });

  return { authToken, username };
}

export async function refreshAccessToken(refreshToken: string) {
  const accessToken = await authService.refreshAccessToken(refreshToken);
  accessToken.expiry = Date.now() + accessToken.expires_in * 1000;

  const { authToken, username } = await getAuthToken(accessToken.access_token);
  return { accessToken, authToken, username };
}