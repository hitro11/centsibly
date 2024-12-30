import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { TransactionService } from '../services/transaction.service.server.js';

export class TransactionController {
    static async addTransaction(req: Request) {
        try {
            const email = await UserService.getEmail(req);

            if (!email) {
                throw new Error('Email not found');
            }

            const transaction = req.body;
            return await TransactionService.addTransaction(email, transaction);
        } catch (error) {
            throw error;
        }
    }
}
