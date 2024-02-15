import { Router } from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);

export default router;
