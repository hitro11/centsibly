import { redditProfileService } from './../services/reddit/profile.js';
import { logger } from '../../config/logger.js';
import * as authService from '../services/authentication.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Subreddit } from '../../../../models/Subreddit.js';
dotenv.config();

async function getUserSubscribedSubreddits(
  accessToken: string
): Promise<Subreddit[]> {
  const subreddits = await redditProfileService.getUserSubscribedSubreddits(
    accessToken
  );
  return subreddits;
}

export const redditUserController = {
  getUserSubscribedSubreddits,
};
