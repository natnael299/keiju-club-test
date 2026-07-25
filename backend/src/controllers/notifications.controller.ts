import type { Request, Response } from "express";
import { notificationsService } from "../services/notifications.service";

type NotificationParams = {
  notificationId: string;
};

type NotificationQuery = {
  ownerId?: string;
  days?: string;
};

export const notificationsController = {
  getAllNotifications(
    req: Request<unknown, unknown, unknown, NotificationQuery>,
    res: Response,
  ) {
    const days = req.query.days ? Number(req.query.days) : undefined;

    if (req.query.days && Number.isNaN(days)) {
      return res.status(400).json({ error: "days must be a number" });
    }

    const notifications = notificationsService.getAllNotifications({
      ownerId: req.query.ownerId,
      days,
    });

    return res.json(notifications);
  },

  getNotificationById(req: Request<NotificationParams>, res: Response) {
    const notification = notificationsService.getNotificationById(
      req.params.notificationId,
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.json(notification);
  },
};
