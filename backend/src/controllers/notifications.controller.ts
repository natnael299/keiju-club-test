import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { notificationsService } from "../services/notifications.service.js";

type NotificationParams = {
  notificationId: string;
};

type NotificationQuery = {
  ownerId?: string;
  days?: string;
};

export const notificationsController = {
  async getAllNotifications(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "caretaker") {
        return res.status(403).json({
          error: "Only caretakers can access notifications",
        });
      }

      const ownerId = req.query.ownerId as string | undefined;

      if (!ownerId) {
        return res.status(400).json({
          error: "ownerId is required",
        });
      }

      if (!user.ownerIds?.includes(ownerId)) {
        return res.status(403).json({
          error: "You do not have access to this owner's notifications",
        });
      }

      const daysValue = req.query.days;

      const days =
        typeof daysValue === "string" ? Number(daysValue) : undefined;

      if (daysValue && Number.isNaN(days)) {
        return res.status(400).json({
          error: "days must be a number",
        });
      }

      const notifications = await notificationsService.getAllNotifications({
        ownerId,
        days,
      });

      return res.json(notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);

      return res.status(500).json({
        error: "Failed to fetch notifications",
      });
    }
  },

  async getNotificationById(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "caretaker") {
        return res.status(403).json({
          error: "Only caretakers can access notifications",
        });
      }

      const notificationId = req.params.notificationId as string;

      const notification =
        await notificationsService.getNotificationById(notificationId);

      if (!notification) {
        return res.status(404).json({
          error: "Notification not found",
        });
      }

      if (!user.ownerIds?.includes(notification.ownerId)) {
        return res.status(403).json({
          error: "You do not have access to this notification",
        });
      }

      return res.json(notification);
    } catch (error) {
      console.error("Failed to fetch notification:", error);

      return res.status(500).json({
        error: "Failed to fetch notification",
      });
    }
  },
};
