import { Router } from "express";

import { notificationsController } from "../controllers/notifications.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, notificationsController.getAllNotifications);

router.get(
  "/:notificationId",
  requireAuth,
  notificationsController.getNotificationById,
);

export default router;
