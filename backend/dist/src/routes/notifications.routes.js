import { Router } from "express";
import { notificationsController } from "../controllers/notifications.controller";
const router = Router();
router.get("/", notificationsController.getAllNotifications);
router.get("/:notificationId", notificationsController.getNotificationById);
export default router;
