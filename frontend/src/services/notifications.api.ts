import { api } from "./api";
import type { RawNotification } from "@/types";

export const notificationsApi = {
  getAll() {
    return api<RawNotification[]>("/notifications");
  },

  getByOwner(ownerId: string) {
    return api<RawNotification[]>(`/notifications?ownerId=${ownerId}`);
  },
};
