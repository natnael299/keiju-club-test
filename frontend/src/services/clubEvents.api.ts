import { api } from "./api";

import type { ClubEvent, EventAudience, EventCategory } from "@/types";

export type CreateClubEventPayload = {
  title: string;
  description: string;

  imageUrl?: string;
  registrationUrl?: string;

  categories: EventCategory[];
  audience: EventAudience;

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

  getOrganizationEvents() {
    return api<ClubEvent[]>("/club-events/organization");
  },

  getById(eventId: string) {
    return api<ClubEvent>(`/club-events/${eventId}`);
  },

  create(payload: CreateClubEventPayload) {
    return api<ClubEvent>("/club-events", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(eventId: string, payload: UpdateClubEventPayload) {
    return api<ClubEvent>(`/club-events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete(eventId: string) {
    return api<void>(`/club-events/${eventId}`, {
      method: "DELETE",
    });
  },
};
