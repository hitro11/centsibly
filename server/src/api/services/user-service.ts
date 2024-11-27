import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { USER_ROLE } from '../../config/constants.js';
import supertokens from 'supertokens-node';
import { UserRepositoryService } from '../repositories/user.repository.js';

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

  static async setUsername(req: Request, res: Response) {
    try {
      const email = (await this.getUserInfo(req, res))?.emails[0];
      if (!email) {
        throw new Error('Email not found');
      }
      logger.debug({ email });
      const username = req.body.username;
      await UserRepositoryService.setUsername(email, username);
    } catch (error) {
      throw error;
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    try {
      const userid = await this.getUserid(req, res);
      const userInfo = await supertokens.getUser(userid);
      return userInfo;
    } catch (error) {
      logger.error(error);
    }
  }
}
