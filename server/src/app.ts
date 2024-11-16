import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './config/logger.js';
import router from './api/routes/index.js';
import { verifyJWT } from './api/services/authentication.js';
// import { openAPIRouter } from "@/api-docs/openAPIRouter";
// import errorHandler from "@/common/middleware/errorHandler";
// import requestLogger from "@/common/middleware/requestLogger";

dotenv.config();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(helmet());

// Set the application to trust the reverse proxy
// app.set("trust proxy", true);

// Request logging
// app.use(requestLogger);

// Swagger UI
// app.use(openAPIRouter);

// Error handlers
// app.use(errorHandler());

app.use('/api', router);

app
  .listen(process.env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = process.env;
    logger.info(`Server (${NODE_ENV}) running on ${HOST}:${PORT}`);
  })
  .on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
