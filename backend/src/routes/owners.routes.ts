import { Router } from "express";

import { ownersController } from "../controllers/owners.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, ownersController.getAllOwners);

router.get("/:ownerId", requireAuth, ownersController.getOwnerById);

export default router;
