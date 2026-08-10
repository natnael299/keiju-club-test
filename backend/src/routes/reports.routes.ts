import { Router } from "express";
import { reportsController } from "../controllers/reports.controller.js";

const router = Router();

router.get("/", reportsController.getAllReports);

export default router;
