import { randomUUID } from "node:crypto";

import { clubEventsRepository } from "../repositories/clubEvents.repository.js";

import type {
  ClubEvent,
  EventAudience,
  EventCategory,
  RegistrationStatus,
} from "../types/index.js";

type GetClubEventsFilters = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
  organizationId?: string;
};

type CreateClubEventInput = {
  organizationId: string;
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

type UpdateClubEventInput = Partial<
  Omit<ClubEvent, "_id" | "_rev" | "docType" | "cdt" | "ldt" | "organizationId">
>;

export const clubEventsService = {
  async getAllClubEvents(filters: GetClubEventsFilters = {}) {
    let events = await clubEventsRepository.findAll();

    if (filters.organizationId) {
      events = events.filter(
        (event) => event.organizationId === filters.organizationId,
      );
    }

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

    return sortEvents(events);
  },

  async getClubEventsByOrganizationId(organizationId: string) {
    const events =
      await clubEventsRepository.findByOrganizationId(organizationId);

    return sortEvents(events);
  },

  async getClubEventById(eventId: string) {
    return clubEventsRepository.findById(eventId);
  },

  async createClubEvent(input: CreateClubEventInput) {
    const now = new Date().toISOString();

    const registrationUrl = normalizeRegistrationUrl(input.registrationUrl);

    const event: ClubEvent = {
      _id: `evt-${randomUUID()}`,
      docType: "clubEvent",
      organizationId: input.organizationId,

      title: input.title.trim(),
      description: input.description.trim(),

      imageUrl: normalizeOptionalValue(input.imageUrl),

      registrationUrl,
      registrationStatus: registrationUrl
        ? (input.registrationStatus ?? "open")
        : undefined,

      categories: input.categories,
      audience: input.audience,

      address: input.address.trim(),
      city: input.city.trim(),

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

    const registrationUrl =
      updates.registrationUrl !== undefined
        ? normalizeRegistrationUrl(updates.registrationUrl)
        : existingEvent.registrationUrl;

    const registrationStatus = getRegistrationStatus(
      registrationUrl,
      updates.registrationStatus,
      existingEvent.registrationStatus,
    );

    const updatedEvent: ClubEvent = {
      ...existingEvent,
      ...updates,

      _id: existingEvent._id,
      _rev: existingEvent._rev,
      docType: "clubEvent",
      organizationId: existingEvent.organizationId,

      title:
        updates.title !== undefined
          ? updates.title.trim()
          : existingEvent.title,

      description:
        updates.description !== undefined
          ? updates.description.trim()
          : existingEvent.description,

      imageUrl:
        updates.imageUrl !== undefined
          ? normalizeOptionalValue(updates.imageUrl)
          : existingEvent.imageUrl,

      registrationUrl,
      registrationStatus,

      address:
        updates.address !== undefined
          ? updates.address.trim()
          : existingEvent.address,

      city:
        updates.city !== undefined ? updates.city.trim() : existingEvent.city,

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

function sortEvents(events: ClubEvent[]): ClubEvent[] {
  return events.sort(
    (firstEvent, secondEvent) =>
      new Date(firstEvent.startsAt).getTime() -
      new Date(secondEvent.startsAt).getTime(),
  );
}

function getRegistrationStatus(
  registrationUrl: string | undefined,
  newStatus: RegistrationStatus | undefined,
  existingStatus: RegistrationStatus | undefined,
): RegistrationStatus | undefined {
  if (!registrationUrl) {
    return undefined;
  }

  return newStatus ?? existingStatus ?? "open";
}

function normalizeOptionalValue(value: string | undefined): string | undefined {
  const normalizedValue = value?.trim();

  return normalizedValue || undefined;
}

function normalizeRegistrationUrl(
  value: string | undefined,
): string | undefined {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const url = new URL(normalizedValue);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Registration URL must use the HTTP or HTTPS protocol.");
  }

  return url.toString();
}
