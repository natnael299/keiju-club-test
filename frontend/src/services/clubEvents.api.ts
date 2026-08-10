import { api } from "./api";
import type { ClubEvent } from "@/types";

export type CreateClubEventPayload = {
  title: string;
  description: string;
  imageUrl?: string;
  address: string;
  city: string;
  startsAt: string;
  endsAt: string;
};

export type UpdateClubEventPayload = Partial<CreateClubEventPayload>;

export const clubEventsApi = {
  getAll() {
    return api<ClubEvent[]>("/club-events");
  },

  create(event: CreateClubEventPayload) {
    return api<ClubEvent>("/club-events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  },

  update(eventId: string, event: UpdateClubEventPayload) {
    return api<ClubEvent>(`/club-events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(event),
    });
  },
};
