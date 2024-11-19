import axios from 'axios';
import { REDDIT_OAUTH_API_HOST } from '../../../config/constants.js';
import { logger } from '../../../config/logger.js';
import { performRedditRequest } from '../common.js';
import { Subreddit } from '../../../../../models/Subreddit.js';

export async function getProfileData(accessToken: string) {
  const url = `${REDDIT_OAUTH_API_HOST}/api/v1/me`;
  const { data } = await performRedditRequest(url, 'get', accessToken);
  return data;
}

export const redditProfileService = {
  getUserSubscribedSubreddits: async (accessToken: string) => {
    let after = null;
    const subreddits: Subreddit[] = [];

    do {
      const url = `${REDDIT_OAUTH_API_HOST}/subreddits/mine/subscriber?limit=100&after=${after}`;
      const { data } = await performRedditRequest(url, 'get', accessToken);
      after = data.data.after;
      for (const subreddit of data.data.children) {
        subreddits.push({
          name: subreddit.data.display_name_prefixed,
          url: `https://reddit.com${subreddit.data.url}`,
          icon: subreddit.data.community_icon.split('?')[0],
          id: subreddit.data.name,
          favorited: subreddit.data.user_has_favorited,
        });
      }
    } while (after);

    return subreddits;
  },
};
