import { Router } from "express";
import { testController } from "../controllers/test.controller";

const router = Router();

// GET /api/test/test1
router.get("/test1", (req, res) => testController.getTest1(req, res));

export default router;
