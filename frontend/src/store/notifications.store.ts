import { create } from "zustand";
import { notificationsApi } from "@/services/notifications.api";
import type { Notification } from "@/types";

type NotificationsStore = {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  fetchOwnerNotifications: (ownerId: string) => Promise<void>;
  reset: () => void;
};

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  loading: false,

  async fetchNotifications() {
    set({ loading: true });

    try {
      const notifications = await notificationsApi.getAll();

      set({
        notifications,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  async fetchOwnerNotifications(ownerId) {
    set({ loading: true });

    try {
      const notifications = await notificationsApi.getByOwner(ownerId);

      set({
        notifications,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  reset() {
    set({
      notifications: [],
      loading: false,
    });
  },
}));
