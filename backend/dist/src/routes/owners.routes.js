import { Router } from "express";
import { ownersController } from "../controllers/owners.controller";
const router = Router();
router.get("/", ownersController.getAllOwners);
router.get("/:ownerId", ownersController.getOwnerById);
export default router;
