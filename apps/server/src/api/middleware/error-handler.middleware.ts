import { Request, Response, NextFunction } from 'express';
import { logger } from '../../config/logger.js';
import { createHttpResponse } from '@centsibly/utils/utils';

export const ErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('ERROR!!');
    const errMsg = err.message || 'Something went wrong';
    const stack = process.env.NODE_ENV === 'development' ? err.stack : {};

    res.status(err.statusCode || 500).json(
        createHttpResponse('error', null, errMsg, stack)
    );
};
