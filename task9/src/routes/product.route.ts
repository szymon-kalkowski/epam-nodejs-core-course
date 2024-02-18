import { Router } from "express";
import { productController } from "../controllers/index.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);

export default router;
