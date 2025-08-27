import { Request, Response, NextFunction } from 'express';
import { logger } from '../../config/logger.js';
import { createHttpResponse } from '@centsibly/utils/utils';

export const ErrorHandler = (
    err: any, // eslint-disable-line
    req: Request,
    res: Response,
    next: NextFunction // eslint-disable-line
) => {
    logger.error('ERROR: ');
    logger.error(err);
    const errMsg = err.message || 'Something went wrong';
    const stack = process.env.NODE_ENV === 'development' ? err.stack : {};

    const eo = createHttpResponse('error', null, errMsg, stack);

    logger.error('eo: ', JSON.stringify(eo));

    res.status(err.statusCode || 500).json('sss');
};
