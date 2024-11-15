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
	const token = await getAccessToken(urlInfo.url, urlInfo.body);
	return token;
}

export async function getJwtController(accessToken: string): Promise<string> {
	const profileData = await getProfileData(accessToken);
	const username = profileData.name;
	const authToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
		expiresIn: '24h',
	});
	return authToken;
}

export async function refreshAccessTokenController(refreshToken: string) {
	const accessToken = await refreshAccessToken(refreshToken);
	return accessToken;
}
