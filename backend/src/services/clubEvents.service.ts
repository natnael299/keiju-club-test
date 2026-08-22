import { clubEventsRepository } from "../repositories/clubEvents.repository.js";

export const eventImagesService = {
  async saveImage(eventId: string, imageBuffer: Buffer, contentType: string) {
    return clubEventsRepository.saveImage(eventId, imageBuffer, contentType);
  },

  async getImage(eventId: string) {
    return clubEventsRepository.getImage(eventId);
  },

  async removeImage(eventId: string) {
    return clubEventsRepository.removeImage(eventId);
  },
};
