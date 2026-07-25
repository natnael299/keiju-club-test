import { clubEventsService } from "../services/clubEvents.service";
export const clubEventsController = {
    getAllClubEvents(req, res) {
        const events = clubEventsService.getAllClubEvents({
            city: req.query.city,
            category: req.query.category,
            audience: req.query.audience,
        });
        return res.json(events);
    },
    getClubEventById(req, res) {
        const event = clubEventsService.getClubEventById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: "Club event not found" });
        }
        return res.json(event);
    },
};
