import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  healthRoute,
  authRoute,
  productRoute,
  userRoute,
  cartRoute,
} from "./routes/index.js";
import { CurrentUser, verifyToken } from "./middleware/auth.js";
import { shutdown, logger } from "./utils/index.js";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser;
    }
  }
}

const app: Application = express();
const port = process.env.PORT;
const host = process.env.HOST;
const db = process.env.DB;

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/health", healthRoute);
app.use("/api/products", verifyToken, productRoute);
app.use("/api/cart", verifyToken, cartRoute);
app.use("/api/users", verifyToken, userRoute);
app.use("/api/auth", authRoute);

mongoose
  .connect(db!)
  .then(() => {
    logger.info("Connected to MongoDB");

    const server = app.listen(port, () => {
      logger.info(`Server is Fire at http://${host}:${port}`);
    });

    let connections: any = [];

    server.on("connection", (connection) => {
      connections.push(connection);

      connection.on("close", () => {
        connections = connections.filter(
          (currentConnection: any) => currentConnection !== connection
        );
      });
    });

    process.on("SIGTERM", () => shutdown(server, connections));
    process.on("SIGINT", () => shutdown(server, connections));
  })
  .catch((err) => {
    logger.error(err);
  });
