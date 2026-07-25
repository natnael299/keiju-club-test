import { mockNotifications } from "../data";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
export const notificationsService = {
    getAllNotifications(filters = {}) {
        let notifications = [...mockNotifications];
        if (filters.ownerId) {
            notifications = notifications.filter((notification) => notification.ownerId === filters.ownerId);
        }
        if (filters.days) {
            const cutoff = Date.now() - filters.days * ONE_DAY_IN_MS;
            notifications = notifications.filter((notification) => new Date(notification.dt).getTime() >= cutoff);
        }
        return notifications.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime());
    },
    getNotificationById(notificationId) {
        return mockNotifications.find((notification) => notification._id === notificationId);
    },
};
