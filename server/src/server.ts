
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import logger from './logger.js';

// import { openAPIRouter } from "@/api-docs/openAPIRouter";
// import errorHandler from "@/common/middleware/errorHandler";
// import requestLogger from "@/common/middleware/requestLogger";

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Request logging
// app.use(requestLogger);

// Routes
// app.use("/health-check", healthCheckRouter);

// Swagger UI
// app.use(openAPIRouter);

// Error handlers
// app.use(errorHandler());

export { app, logger };
