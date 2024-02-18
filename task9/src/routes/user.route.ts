import { Router } from "express";
import { userController } from "../controllers/index.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);

export default router;
