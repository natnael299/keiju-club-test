import { Router } from "express";

import { clubEventsController } from "../controllers/clubEvents.controller.js";
import { eventImagesController } from "../controllers/eventImages.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { validateCreateClubEvent } from "../middleware/clubEvents.validation.middleware.js";
import { uploadEventImage } from "../middleware/eventImageUpload.middleware.js";

const router = Router();

router.get("/", clubEventsController.getAllClubEvents);

router.get(
  "/organization",
  requireAuth,
  clubEventsController.getOrganizationClubEvents,
);

router.get("/:eventId/image", eventImagesController.getEventImage);

router.get("/:eventId", clubEventsController.getClubEventById);

router.post(
  "/",
  requireAuth,
  validateCreateClubEvent,
  clubEventsController.createClubEvent,
);

router.put(
  "/:eventId",
  requireAuth,
  validateCreateClubEvent,
  clubEventsController.updateClubEvent,
);

router.put(
  "/:eventId/image",
  requireAuth,
  uploadEventImage,
  eventImagesController.uploadEventImage,
);

router.delete(
  "/:eventId/image",
  requireAuth,
  eventImagesController.removeEventImage,
);

router.delete("/:eventId", requireAuth, clubEventsController.deleteClubEvent);

export default router;
