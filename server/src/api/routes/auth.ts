import { logger } from "../../config/logger.js";
import {
  getAccessTokenController,
  getOauthRedirectUriController,
  refreshAccessTokenController,
} from "../controllers/auth.js";
import { Router, Request, Response } from "express";

const loginRoutes = Router();

loginRoutes.get("/get-oauth-code", async (req: Request, res: Response) => {
  const url = await getOauthRedirectUriController();
  res.json(url);
});

loginRoutes.get("/get-access-token", async (req: Request, res: Response) => {
  const code = req.query.code ?? '';
  const state = req.query.state ?? '';
  const token = await getAccessTokenController(code as string, state as string)
  res.json(token ?? null)
});

loginRoutes.post("/refresh-access-token", async (req: Request, res: Response) => {
  logger.debug('/refresh-access-token');
  const refreshToken = req.body.refreshToken ?? '';
  logger.debug({refreshToken});
  const token = await refreshAccessTokenController(refreshToken);
  res.json(token ?? null)
});

loginRoutes.post("/test-ref", async (req: Request, res: Response) => {
  logger.debug('/test-ref');
  res.json(null);
});

export default loginRoutes;
