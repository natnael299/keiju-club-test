import { api } from "./api";
import type { Notification } from "@/types";

export const notificationsApi = {
  getAll() {
    return api<Notification[]>("/notifications");
  },

  getByOwner(ownerId: string) {
    return api<Notification[]>(`/notifications?ownerId=${ownerId}`);
  },
};
