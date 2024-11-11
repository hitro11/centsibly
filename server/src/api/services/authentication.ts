import { logger } from '../../config/logger.ts';
import { REDDIT_API_HOST, REDDIT_OAUTH_REDIRECT_URI } from '../../config/constants.ts';
import dotenv from 'dotenv';
dotenv.config();

export async function redirectToLogin() {
    const state = Math.random().toString(36).substr(2, 5);
    const scope = 'identity';
    const url = `${REDDIT_API_HOST}/v1/authorize?client_id=${process.env.REDDIT_OAUTH_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDDIT_OAUTH_REDIRECT_URI}&duration=temporary&scope=${scope}`
    logger.debug(url);
    return url;
}