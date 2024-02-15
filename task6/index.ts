import express, { Application } from "express";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import bodyParser from "body-parser";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
