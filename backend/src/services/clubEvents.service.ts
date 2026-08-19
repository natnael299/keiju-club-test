import { randomUUID } from "node:crypto";

import { clubEventsRepository } from "../repositories/clubEvents.repository.js";

import type {
  ClubEvent,
  EventAudience,
  EventCategory,
} from "../types/index.js";

type GetClubEventsFilters = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
};

type CreateClubEventInput = {
  organizationId: string;
  title: string;
  description: string;
  imageUrl?: string;
  categories: EventCategory[];
  audience: EventAudience;
  address: string;
  city: string;
  startsAt: string;
  endsAt: string;
};

type UpdateClubEventInput = Partial<
  Omit<ClubEvent, "_id" | "_rev" | "cdt" | "organizationId">
>;

export const clubEventsService = {
  async getAllClubEvents(filters: GetClubEventsFilters = {}) {
    let events = await clubEventsRepository.findAll();

    if (filters.city) {
      events = events.filter(
        (event) => event.city.toLowerCase() === filters.city?.toLowerCase(),
      );
    }

    if (filters.category) {
      events = events.filter((event) =>
        event.categories.includes(filters.category as EventCategory),
      );
    }

    if (filters.audience) {
      events = events.filter((event) => event.audience === filters.audience);
    }

    return events.sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  },

  async getClubEventById(eventId: string) {
    return clubEventsRepository.findById(eventId);
  },

  async createClubEvent(input: CreateClubEventInput) {
    const now = new Date().toISOString();

    const event: ClubEvent = {
      _id: `evt-${randomUUID()}`,
      docType: "clubEvent",

      organizationId: input.organizationId,

      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,

      categories: input.categories,
      audience: input.audience,

      address: input.address,
      city: input.city,

      startsAt: input.startsAt,
      endsAt: input.endsAt,

      cdt: now,
      ldt: now,
    };

    return clubEventsRepository.create(event);
  },

  async updateClubEvent(eventId: string, updates: UpdateClubEventInput) {
    const existingEvent = await clubEventsRepository.findById(eventId);

    if (!existingEvent) {
      return null;
    }

    const updatedEvent: ClubEvent = {
      ...existingEvent,
      ...updates,

      _id: existingEvent._id,
      _rev: existingEvent._rev,
      docType: "clubEvent",

      organizationId: existingEvent.organizationId,

      cdt: existingEvent.cdt,
      ldt: new Date().toISOString(),
    };

    return clubEventsRepository.update(updatedEvent);
  },

  async deleteClubEvent(eventId: string) {
    const existingEvent = await clubEventsRepository.findById(eventId);

    if (!existingEvent) {
      return false;
    }

    await clubEventsRepository.remove(eventId);

    return true;
  },
};
