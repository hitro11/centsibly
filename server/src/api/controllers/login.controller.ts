import { logger } from "../../config/logger";
import {
  redirectToLogin,
  generateAccessTokenInfoService,
  getAccessTokenService,
} from "../services/authentication";

export async function getOauthRedirectUri() {
  return await redirectToLogin();
}

export async function getAccessToken(code: string, state: string) {
  const urlInfo = await generateAccessTokenInfoService(code, state);
  const token = await getAccessTokenService(urlInfo.url, urlInfo.body);
  logger.debug(token);
}
