import { notificationsRepository } from "../repositories/notifications.repository.js";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

type GetNotificationsFilters = {
  ownerId?: string;
  days?: number;
};

export const notificationsService = {
  async getAllNotifications(filters: GetNotificationsFilters = {}) {
    let notifications = filters.ownerId
      ? await notificationsRepository.findByOwnerId(filters.ownerId)
      : await notificationsRepository.findAll();

    if (filters.days) {
      const cutoff = Date.now() - filters.days * ONE_DAY_IN_MS;

      notifications = notifications.filter(
        (notification) => new Date(notification.dt).getTime() >= cutoff,
      );
    }

    return notifications.sort(
      (a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime(),
    );
  },

  async getNotificationById(notificationId: string) {
    return notificationsRepository.findById(notificationId);
  },
};
