/* Imports */
import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './config/logger.js';
import router from './api/routes/index.js';
// import { openAPIRouter } from "@/api-docs/openAPIRouter";
// import requestLogger from "@/common/middleware/requestLogger";
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import { middleware } from 'supertokens-node/framework/express';
import { errorHandler } from 'supertokens-node/framework/express';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
dotenv.config();

supertokens.init({
  framework: 'express',
  supertokens: {
    connectionURI: process.env.SUPERT0KENS_CONNECTION_URI,
    apiKey: process.env.SUPERT0KENS_API_KEY,
  },
  appInfo: {
    appName: 'Grove',
    apiDomain: process.env.HOST,
    websiteDomain: process.env.CLIENT_ORIGIN,
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: 'google',
              clients: [
                {
                  clientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
                  clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: 'github',
              clients: [
                {
                  clientId: process.env.OAUTH_GITHUB_CLIENT_ID,
                  clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
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
              let existingUsers = await supertokens.listUsersByAccountInfo(
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
                        }) && lM.recipeId === 'thirdparty'
                    ) !== undefined
                )
              ) {
                // this means we are trying to sign in with the same social login, so we allow it
                return originalImplementation.signInUp(input);
              }
              // this means that the email already exists with another social login method, so we throw an error
              logger.warn('Cannot sign up as email already exists');
              throw new Error('Cannot sign up as email already exists');
            },
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUpPOST: async (input) => {
              try {
                return await originalImplementation.signInUpPOST!(input);
              } catch (err: any) {
                if (err.message === 'Cannot sign up as email already exists') {
                  logger.info(
                    'Seems like you already have an account with another social login provider. Please use that instead.'
                  );
                  return {
                    status: 'GENERAL_ERROR',
                    message:
                      'You already have an account with another social login provider. Please sign in with that instead.',
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

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api', verifySession(), router);
app.use(errorHandler());

// Set the application to trust the reverse proxy
// app.set("trust proxy", true);

// Request logging
// app.use(requestLogger);

// Swagger UI
// app.use(openAPIRouter);

app
  .listen(process.env.PORT, () => {
    const { NODE_ENV, HOST } = process.env;
    logger.info(`Server (${NODE_ENV}) running on ${HOST}`);
  })
  .on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
