import express, { Application } from "express";
import productRoutes from "./routes/product.route";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
