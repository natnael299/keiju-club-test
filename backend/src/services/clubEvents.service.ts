import { mockClubEvents } from "../data/index.js";
import type { EventAudience, EventCategory } from "../types/index.js";

type GetClubEventsFilters = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
};

export const clubEventsService = {
  getAllClubEvents(filters: GetClubEventsFilters = {}) {
    let events = [...mockClubEvents];

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

  getClubEventById(eventId: string) {
    return mockClubEvents.find((event) => event.id === eventId);
  },
};
