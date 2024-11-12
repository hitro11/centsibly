import { logger } from "../../config/logger";
import {
  getAccessTokenController,
  getOauthRedirectUriController,
} from "../controllers/login";
import { Router, Request, Response } from "express";

const loginRoutes = Router();

loginRoutes.get("/", async (req: Request, res: Response) => {
  const url = await getOauthRedirectUriController();
  res.json(url);
});

loginRoutes.get("/get-access-token", async (req: Request, res: Response) => {
  const code = req.query.code ?? '';
  const state = req.query.state ?? '';
  const token = await getAccessTokenController(code as string, state as string)
  res.json(token ?? null)
});

export default loginRoutes;
