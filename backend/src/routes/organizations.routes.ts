import { Router } from "express";

import { organizationsController } from "../controllers/organizations.controller.js";

const router = Router();

router.get("/", organizationsController.getAllOrganizations);

router.get("/:organizationId", organizationsController.getOrganizationById);

export default router;
