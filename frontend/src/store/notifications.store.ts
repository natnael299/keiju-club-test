import { create } from "zustand";

import { notificationsApi } from "@/services/notifications.api";

import type { Notification } from "@/types";

type NotificationsStore = {
  notifications: Notification[];
  loading: boolean;
  error: string | null;

  fetchNotifications: () => Promise<void>;

  fetchOwnerNotifications: (ownerId: string) => Promise<void>;

  reset: () => void;
};

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  loading: false,
  error: null,

  async fetchNotifications() {
    set({
      loading: true,
      error: null,
    });

    try {
      const notifications = await notificationsApi.getAll();

      set({
        notifications,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("NOTIFICATIONS FETCH ERROR:", error);

      set({
        notifications: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Notifications could not be loaded.",
      });
    }
  },

  async fetchOwnerNotifications(ownerId) {
    set({
      loading: true,
      error: null,
    });

    try {
      const notifications = await notificationsApi.getByOwner(ownerId);

      set({
        notifications,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("OWNER NOTIFICATIONS FETCH ERROR:", error);

      set({
        notifications: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Notifications could not be loaded.",
      });
    }
  },

  reset() {
    set({
      notifications: [],
      loading: false,
      error: null,
    });
  },
}));
