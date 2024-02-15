import { Router } from "express";
import cartController from "../controllers/cart.controller";

const router = Router();

router.get("/", cartController.getUserCart);
router.put("/", cartController.updateUserCart);
router.delete("/", cartController.emptyUserCart);
router.post("/checkout", cartController.createOrder);

export default router;
