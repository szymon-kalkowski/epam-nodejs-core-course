import { logger } from "./logger.js";

export const shutdown = (server: any, connections: any) => {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  connections.forEach((connection: any) => connection.end());

  setTimeout(() => {
    connections.forEach((connection: any) => connection.destroy());
  }, 10000);
};
