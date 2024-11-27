import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { USER_ROLE } from '../../config/constants.js';
import supertokens from 'supertokens-node';

export class UserService {
  static async getUserRoles(req: Request, res: Response) {
    const userid = await this.getUserid(req, res);
    const roles = await UserRoles.getRolesForUser('public', userid);
    logger.debug(roles);
    return roles;
  }

  static async setUserRoles(req: Request, res: Response) {
    try {
      const userid = await this.getUserid(req, res);
      await UserRoles.addRoleToUser('public', userid, USER_ROLE);
    } catch (error) {
      logger.error(error);
    }
  }

  static async getUserid(req: Request, res: Response) {
    const session = await Session.getSession(req, res);
    return session.getUserId();
  }

  static async getUserInfo(req: Request, res: Response) {
    try {
      const userid = await this.getUserid(req, res);
      logger.debug({ userid });
      const userInfo = await supertokens.getUser(userid);
      return userInfo;
    } catch (error) {
      logger.error(error);
    }
  }
}
