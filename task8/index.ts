import express, { Application } from "express";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { CurrentUser, verifyToken } from "./middleware/auth";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser;
    }
  }
}

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/products", verifyToken, productRoutes);
app.use("/api/cart", verifyToken, cartRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
