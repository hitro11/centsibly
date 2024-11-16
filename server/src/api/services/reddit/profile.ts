import axios from 'axios';
import { REDDIT_OAUTH_API_HOST } from '../../../config/constants.js';
import { logger } from '../../../config/logger.js';

export async function getProfileData(accessToken: string) {
  logger.debug('getRedditProfile access token: ', accessToken);
  const url = `${REDDIT_OAUTH_API_HOST}/api/v1/me`;

  const { data } = await axios({
    url,
    method: 'get',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}
