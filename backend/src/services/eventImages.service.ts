import { clubEventsRepository } from "../repositories/clubEvents.repository.js";

export const eventImagesService = {
  async saveEventImage(
    eventId: string,
    imageBuffer: Buffer,
    contentType: string,
  ) {
    return clubEventsRepository.saveImage(eventId, imageBuffer, contentType);
  },

  async getEventImage(eventId: string) {
    return clubEventsRepository.getImage(eventId);
  },
};
