import { logger } from '../../config/logger.js';
import {
  getOauthCodeUrl,
  generateAccessTokenInfo,
  getAccessToken,
  refreshAccessToken,
} from '../services/authentication.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getProfileData } from '../services/reddit/profile.js';
dotenv.config();

export async function getOauthRedirectUriController() {
  return await getOauthCodeUrl();
}

export async function getAccessTokenController(code: string, state: string) {
  const urlInfo = await generateAccessTokenInfo(code, state);
  const accessToken = await getAccessToken(urlInfo.url, urlInfo.body);
  accessToken.expiry = Date.now() + accessToken.expires_in * 1000;
  return accessToken;
}

export async function getJwtController(
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

export async function refreshAccessTokenController(refreshToken: string) {
  const accessToken = await refreshAccessToken(refreshToken);
  accessToken.expiry = Date.now() + accessToken.expires_in * 1000;

  const { authToken, username } = await getJwtController(
    accessToken.access_token
  );
  return { accessToken, authToken, username };
}
