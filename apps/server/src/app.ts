/* Imports */
import { loadEnv } from '../loadEnv.js';
loadEnv();

import express, {
    Request,
    type Express,
    Response,
    RequestHandler,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger } from './config/logger.js';
import { router } from './api/routes/index.js';
// import { openAPIRouter } from "@/api-docs/openAPIRouter";
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import { middleware } from 'supertokens-node/framework/express';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import { connectToDBclient, pingDB } from './config/db.js';
import EmailVerification from 'supertokens-node/recipe/emailverification';
import { ErrorHandler } from './api/middleware/error-handler.middleware.js';
import cron from 'node-cron';
import ky from 'ky';
import { BudgetService } from './api/services/budget.service.js';

supertokens.init({
    framework: 'express',
    supertokens: {
        connectionURI: process.env.SUPERT0KENS_CONNECTION_URI,
        apiKey: process.env.SUPERT0KENS_API_KEY,
    },
    appInfo: {
        appName: 'Centsibly',
        apiDomain: process.env.HOST,
        websiteDomain: process.env.CLIENT_ORIGIN,
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
    },
    recipeList: [
        EmailVerification.init({
            mode: 'REQUIRED',
        }),
        EmailPassword.init({}),

        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: 'google',
                            clients: [
                                {
                                    clientId:
                                        process.env.OAUTH_GOOGLE_CLIENT_ID,
                                    clientSecret:
                                        process.env.OAUTH_GOOGLE_CLIENT_SECRET,
                                },
                            ],
                        },
                    },
                ],
            },
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signInUp: async function (input) {
                            const existingUsers =
                                await supertokens.listUsersByAccountInfo(
                                    input.tenantId,
                                    {
                                        email: input.email,
                                    }
                                );
                            if (existingUsers.length === 0) {
                                return originalImplementation.signInUp(input);
                            }
                            if (
                                existingUsers.find(
                                    (u) =>
                                        u.loginMethods.find(
                                            (lM) =>
                                                lM.hasSameThirdPartyInfoAs({
                                                    id: input.thirdPartyId,
                                                    userId: input.thirdPartyUserId,
                                                }) &&
                                                lM.recipeId === 'thirdparty'
                                        ) !== undefined
                                )
                            ) {
                                // this means we are trying to sign in with the same social login, so we allow it
                                return originalImplementation.signInUp(input);
                            }
                            // this means that the email already exists with another social login method, so we throw an error
                            logger.warn(
                                'emailAlreadyExistsWithDifferentProvider'
                            );
                            throw new Error(
                                'emailAlreadyExistsWithDifferentProvider'
                            );
                        },
                    };
                },
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signInUpPOST: async (input) => {
                            try {
                                return await originalImplementation.signInUpPOST!(
                                    input
                                );
                            } catch (err: any) {
                                if (
                                    err.message ===
                                    'emailAlreadyExistsWithDifferentProvider'
                                ) {
                                    return {
                                        status: 'GENERAL_ERROR',
                                        message:
                                            'This email is already linked to an account created with a social login. Please sign in using your social account instead.',
                                    };
                                }
                                throw err;
                            }
                        },
                    };
                },
            },
        }),
        Session.init(),
        Dashboard.init({
            admins: process.env.SUPERT0KENS_DASHBOARD_ADMIN
                ? [process.env.SUPERT0KENS_DASHBOARD_ADMIN]
                : undefined,
        }),
        UserRoles.init(),
    ],
});

const app: Express = express();

// database
await connectToDBclient();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware() as RequestHandler);
app.use(morgan('common')); // request logging

// Set the application to trust the reverse proxy
// app.set("trust proxy", true);

// Swagger UI
// app.use(openAPIRouter);

// routes
app.get('/health', async (req: Request, res: Response) => {
    const result = 'OK';
    res.status(200).send({ result });
});

// access backend route periodically to prevent idle spindown
cron.schedule('*/11 * * * *', async () => {
    await ky.get(`${process.env.HOST}/health`);
});

cron.schedule('0 0 1 * *', async () => {
    await BudgetService.createBudgetsForNewMonth();
});

app.use('/api', router);

app.use(ErrorHandler);

app.listen(process.env.PORT || '10000', () => {
    const { NODE_ENV, HOST } = process.env;
    logger.info(`Server (${NODE_ENV}) running on ${HOST}`);
}).on('error', (err: unknown) => {
    logger.error(err);
    process.exit(1);
});
