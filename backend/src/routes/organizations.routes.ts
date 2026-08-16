import { Router } from "express";

import { organizationsController } from "../controllers/organizations.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/:organizationId",
  requireAuth,
  organizationsController.getOrganizationById,
);

export default router;
