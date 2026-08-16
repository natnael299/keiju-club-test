import type { Request, Response } from "express";

import { notificationsService } from "../services/notifications.service.js";

type NotificationParams = {
  notificationId: string;
};

type NotificationQuery = {
  ownerId?: string;
  days?: string;
};

export const notificationsController = {
  async getAllNotifications(
    req: Request<unknown, unknown, unknown, NotificationQuery>,
    res: Response,
  ) {
    const days = req.query.days ? Number(req.query.days) : undefined;

    if (req.query.days && Number.isNaN(days)) {
      return res.status(400).json({
        error: "days must be a number",
      });
    }

    try {
      const notifications = await notificationsService.getAllNotifications({
        ownerId: req.query.ownerId,
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

  async getNotificationById(req: Request<NotificationParams>, res: Response) {
    try {
      const notification = await notificationsService.getNotificationById(
        req.params.notificationId,
      );

      if (!notification) {
        return res.status(404).json({
          error: "Notification not found",
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
