import { api } from "./api";

import type {
  ClubEvent,
  EventAudience,
  EventCategory,
  RegistrationStatus,
} from "@/types";

export type CreateClubEventPayload = {
  title: string;
  description: string;
  imageUrl?: string;
  registrationUrl?: string;
  registrationStatus?: RegistrationStatus;
  categories: EventCategory[];
  audience: EventAudience;
  address: string;
  city: string;
  startsAt: string;
  endsAt: string;
};

export type UpdateClubEventPayload = Partial<CreateClubEventPayload>;

function resolveImageUrl(imageUrl?: string): string | undefined {
  if (!imageUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

  if (!apiUrl) {
    return imageUrl;
  }

  try {
    const apiOrigin = new URL(apiUrl, window.location.origin).origin;

    return new URL(imageUrl, apiOrigin).toString();
  } catch {
    return imageUrl;
  }
}

function normalizeEvent(event: ClubEvent): ClubEvent {
  return {
    ...event,
    imageUrl: resolveImageUrl(event.imageUrl),
  };
}

function normalizeEvents(events: ClubEvent[]): ClubEvent[] {
  return events.map(normalizeEvent);
}

export const clubEventsApi = {
  async getAll() {
    const events = await api<ClubEvent[]>("/club-events");

    return normalizeEvents(events);
  },

  async getOrganizationEvents() {
    const events = await api<ClubEvent[]>("/club-events/organization");

    return normalizeEvents(events);
  },

  async getById(eventId: string) {
    const event = await api<ClubEvent>(`/club-events/${eventId}`);

    return normalizeEvent(event);
  },

  async create(payload: CreateClubEventPayload) {
    const event = await api<ClubEvent>("/club-events", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizeEvent(event);
  },

  async update(eventId: string, payload: UpdateClubEventPayload) {
    const event = await api<ClubEvent>(`/club-events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return normalizeEvent(event);
  },

  async uploadImage(eventId: string, image: File) {
    const formData = new FormData();

    formData.append("image", image);

    const event = await api<ClubEvent>(`/club-events/${eventId}/image`, {
      method: "PUT",
      body: formData,
    });

    return normalizeEvent(event);
  },

  async removeImage(eventId: string) {
    const event = await api<ClubEvent>(`/club-events/${eventId}/image`, {
      method: "DELETE",
    });

    return normalizeEvent(event);
  },

  delete(eventId: string) {
    return api<void>(`/club-events/${eventId}`, {
      method: "DELETE",
    });
  },
};
