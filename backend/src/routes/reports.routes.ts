import { Router } from "express";

import { reportsController } from "../controllers/reports.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, reportsController.getAllReports);

export default router;
