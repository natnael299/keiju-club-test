import { Router } from "express";

import { clubEventsController } from "../controllers/clubEvents.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", clubEventsController.getAllClubEvents);

router.get(
  "/organization",
  requireAuth,
  clubEventsController.getOrganizationClubEvents,
);

router.get("/:eventId", clubEventsController.getClubEventById);

router.post("/", requireAuth, clubEventsController.createClubEvent);

router.put("/:eventId", requireAuth, clubEventsController.updateClubEvent);

router.delete("/:eventId", requireAuth, clubEventsController.deleteClubEvent);

export default router;
