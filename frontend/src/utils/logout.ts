import { useAuthStore } from "@/store/authStore";
import { useOwnerStore } from "@/store/owner.store";
import { useNotificationsStore } from "@/store/notifications.store";
import { useReportsStore } from "@/store/reports.store";
import { useClubEventsStore } from "@/store/clubEvents.store";

export function logoutUser() {
  useAuthStore.getState().logout();

  useOwnerStore.getState().reset();

  useNotificationsStore.getState().reset();

  useReportsStore.getState().reset();

  useClubEventsStore.getState().reset();
}
