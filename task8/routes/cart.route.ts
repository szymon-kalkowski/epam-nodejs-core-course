import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", cartController.getUserCart);
router.put("/", cartController.updateUserCart);
router.delete("/", isAdmin, cartController.emptyUserCart);
router.post("/checkout", cartController.createOrder);

export default router;
