import { logger } from "../../config/logger";
import {
  getOauthCodeUrl,
  generateAccessTokenInfo,
  getAccessToken,
  refreshAccessToken,
} from "../services/authentication";

export async function getOauthRedirectUriController() {
  return await getOauthCodeUrl();
}

export async function getAccessTokenController(code: string, state: string) {
  const urlInfo = await generateAccessTokenInfo(code, state);
  const token = await getAccessToken(urlInfo.url, urlInfo.body);
  return token;
}

export async function refreshAccessTokenController(refreshToken: string) {
  const accessToken = await refreshAccessToken(refreshToken);
  return accessToken;
}

