import axios from 'axios'
import { logger } from '../../config/logger.ts'
import {
  REDDIT_API_HOST,
  REDDIT_OAUTH_REDIRECT_URI,
} from '../../config/constants.ts'
import dotenv from 'dotenv'
dotenv.config()

const state = Math.random().toString(36).substr(2, 5)
const scope =
  'subscribe,vote,mysubreddits,submit,read,save,privatemessages,report,identity,account,wikiedit,wikiread,edit,modself,flair,history,'

export async function redirectToLogin() {
  const url = `${REDDIT_API_HOST}/v1/authorize?client_id=${process.env.REDDIT_OAUTH_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDDIT_OAUTH_REDIRECT_URI}&duration=permanent&scope=${scope}`
  return url
}

export async function generateAccessTokenInfoService(
  code: string,
  state: string,
) {
  const url = `${REDDIT_API_HOST}/v1/access_token`
  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDDIT_OAUTH_REDIRECT_URI,
  }

  return { url, body }
}

export async function getAccessTokenService(
  url: string,
  body: { grant_type: string; code: string; redirect_uri: string },
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
  })

  return data
}

export function storeOauthTokenInfo(token: {
  access_token: string
  token_type: 'bearer'
  expires_in: number
  refresh_token: string
  scope: string
}) {}