import { app, logger } from "./server";
import dotenv from 'dotenv';
dotenv.config();

const server = app.listen(process.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = process.env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);