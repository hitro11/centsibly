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
const app: Express = express();

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
    }),
    Session.init(), // initializes session features
    Dashboard.init({
      admins: process.env.SUPERT0KENS_DASHBOARD_ADMIN
        ? [process.env.SUPERT0KENS_DASHBOARD_ADMIN]
        : undefined,
    }),
    UserRoles.init(),
  ],
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());
app.use(helmet());

// Set the application to trust the reverse proxy
// app.set("trust proxy", true);

// Request logging
// app.use(requestLogger);

// Swagger UI
// app.use(openAPIRouter);

app.use('/api', verifySession(), router);

// Error handlers
app.use(errorHandler());

app
  .listen(process.env.PORT, () => {
    const { NODE_ENV, HOST } = process.env;
    logger.info(`Server (${NODE_ENV}) running on ${HOST}`);
  })
  .on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
