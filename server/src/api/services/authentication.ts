import axios from 'axios';
import { logger } from '../../config/logger.js';
import {
  REDDIT_API_HOST_UNAUTHORIZED,
  REDDIT_OAUTH_REDIRECT_URI,
} from '../../config/constants.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { Request, NextFunction } from 'express';

const state = Math.random().toString(36).substr(2, 5);
const scope =
  'subscribe,vote,mysubreddits,submit,read,save,privatemessages,report,identity,account,wikiedit,wikiread,edit,modself,flair,history,';

export async function getOauthCodeUrl() {
  const url = `${REDDIT_API_HOST_UNAUTHORIZED}/v1/authorize?client_id=${process.env.REDDIT_OAUTH_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDDIT_OAUTH_REDIRECT_URI}&duration=permanent&scope=${scope}`;
  return url;
}

export async function generateAccessTokenInfo(code: string, state: string) {
  const url = `${REDDIT_API_HOST_UNAUTHORIZED}/v1/access_token`;
  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDDIT_OAUTH_REDIRECT_URI,
  };

  return { url, body };
}

export async function getAccessToken(
  url: string,
  body: { grant_type: string; code: string; redirect_uri: string }
) {
  const { data } = await axios({
    url,
    method: 'post',
    data: `grant_type=authorization_code&code=${body.code}&redirect_uri=${REDDIT_OAUTH_REDIRECT_URI}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    auth: {
      username: process.env.REDDIT_OAUTH_CLIENT_ID ?? '',
      password: process.env.REDDIT_OAUTH_SECRET_ID ?? '',
    },
  });

  return data;
}

export async function refreshAccessToken(refreshToken: string) {
  const { data } = await axios({
    url: `${REDDIT_API_HOST_UNAUTHORIZED}/v1/access_token`,
    method: 'post',
    data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    auth: {
      username: process.env.REDDIT_OAUTH_CLIENT_ID ?? '',
      password: process.env.REDDIT_OAUTH_SECRET_ID ?? '',
    },
  });

  return data;
}

export function verifyJWT(req: Request, res: any, next: NextFunction) {
  const authToken = req.headers['authorization']
    ?.toLocaleString()
    .split('Bearer ')[1];

  if (!authToken) {
    const msg = 'No Authorization header or header is empty.';
    logger.warn(msg);
    return res.status(401).json(msg);
  }

  jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      const msg = 'Invalid Authorization header.';
      logger.warn(msg);
      return res.status(401).json(msg);
    }

    next();
  });
}
