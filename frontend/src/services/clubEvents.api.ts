import { api } from "./api";
import type { ClubEvent } from "@/types";

export const clubEventsApi = {
  getAll() {
    return api<ClubEvent[]>("/club-events");
  },
};
