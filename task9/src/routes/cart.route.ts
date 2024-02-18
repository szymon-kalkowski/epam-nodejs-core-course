import { Router } from "express";
import { cartController } from "../controllers/index.js";
import { isAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", cartController.getUserCart);
router.put("/", cartController.updateUserCart);
router.delete("/", isAdmin, cartController.emptyUserCart);
router.post("/checkout", cartController.createOrder);

export default router;
