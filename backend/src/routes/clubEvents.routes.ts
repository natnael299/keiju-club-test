import { Router } from "express";
import { clubEventsController } from "../controllers/clubEvents.controller";

const router = Router();

router.get("/", clubEventsController.getAllClubEvents);
router.get("/:eventId", clubEventsController.getClubEventById);

export default router;
