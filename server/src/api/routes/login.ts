import { logger } from "../../config/logger";
import {
  getAccessToken,
  getOauthRedirectUri,
} from "../controllers/login.controller";
import { Router, Request, Response } from "express";

const loginRoutes = Router();

loginRoutes.get("/", async (req: Request, res: Response) => {
  const url = await getOauthRedirectUri();
  res.json(url);
});

loginRoutes.get("/get-access-token", async (req: Request, res: Response) => {
  const code = req.query.code ?? '';
  const state = req.query.state ?? '';
  const token = await getAccessToken(code as string, state as string);
  logger.info(token);
  res.json(token);
});

export default loginRoutes;
