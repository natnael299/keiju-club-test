import { mockClubEvents } from "../data";
export const clubEventsService = {
    getAllClubEvents(filters = {}) {
        let events = [...mockClubEvents];
        if (filters.city) {
            events = events.filter((event) => event.city.toLowerCase() === filters.city?.toLowerCase());
        }
        if (filters.category) {
            events = events.filter((event) => event.categories.includes(filters.category));
        }
        if (filters.audience) {
            events = events.filter((event) => event.audience === filters.audience);
        }
        return events.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    },
    getClubEventById(eventId) {
        return mockClubEvents.find((event) => event.id === eventId);
    },
};
