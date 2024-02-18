import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Application is healthy",
  });
});

export default router;
