import { create } from "zustand";

import {
  clubEventsApi,
  type CreateClubEventPayload,
  type UpdateClubEventPayload,
} from "@/services/clubEvents.api";

import type { ClubEvent } from "@/types";

type ClubEventsStore = {
  clubEvents: ClubEvent[];
  loading: boolean;
  error: string | null;

  fetchClubEvents: () => Promise<void>;
  fetchOrganizationClubEvents: () => Promise<void>;

  createClubEvent: (event: CreateClubEventPayload) => Promise<ClubEvent>;

  updateClubEvent: (
    eventId: string,
    event: UpdateClubEventPayload,
  ) => Promise<ClubEvent>;

  uploadClubEventImage: (eventId: string, image: File) => Promise<ClubEvent>;

  removeClubEventImage: (eventId: string) => Promise<ClubEvent>;

  deleteClubEvent: (eventId: string) => Promise<void>;

  reset: () => void;
};

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export const useClubEventsStore = create<ClubEventsStore>((set) => ({
  clubEvents: [],
  loading: false,
  error: null,

  async fetchClubEvents() {
    set({
      loading: true,
      error: null,
    });

    try {
      const clubEvents = await clubEventsApi.getAll();

      set({
        clubEvents,
        loading: false,
      });
    } catch (error) {
      console.error("CLUB EVENTS FETCH ERROR:", error);

      set({
        clubEvents: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch Club events"),
      });
    }
  },

  async fetchOrganizationClubEvents() {
    set({
      loading: true,
      error: null,
    });

    try {
      const clubEvents = await clubEventsApi.getOrganizationEvents();

      set({
        clubEvents,
        loading: false,
      });
    } catch (error) {
      console.error("ORGANIZATION CLUB EVENTS FETCH ERROR:", error);

      set({
        clubEvents: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch organization events"),
      });
    }
  },

  async createClubEvent(event) {
    set({
      loading: true,
      error: null,
    });

    try {
      const createdEvent = await clubEventsApi.create(event);

      set((state) => ({
        clubEvents: [...state.clubEvents, createdEvent],
        loading: false,
      }));

      return createdEvent;
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Failed to create Club event"),
      });

      throw error;
    }
  },

  async updateClubEvent(eventId, event) {
    set({
      loading: true,
      error: null,
    });

    try {
      const updatedEvent = await clubEventsApi.update(eventId, event);

      set((state) => ({
        clubEvents: state.clubEvents.map((clubEvent) =>
          clubEvent.id === eventId ? updatedEvent : clubEvent,
        ),
        loading: false,
      }));

      return updatedEvent;
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Failed to update Club event"),
      });

      throw error;
    }
  },

  async uploadClubEventImage(eventId, image) {
    set({
      loading: true,
      error: null,
    });

    try {
      const updatedEvent = await clubEventsApi.uploadImage(eventId, image);

      set((state) => ({
        clubEvents: state.clubEvents.map((clubEvent) =>
          clubEvent.id === eventId ? updatedEvent : clubEvent,
        ),
        loading: false,
      }));

      return updatedEvent;
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Failed to upload event image"),
      });

      throw error;
    }
  },

  async removeClubEventImage(eventId) {
    set({
      loading: true,
      error: null,
    });

    try {
      const updatedEvent = await clubEventsApi.removeImage(eventId);

      set((state) => ({
        clubEvents: state.clubEvents.map((clubEvent) =>
          clubEvent.id === eventId ? updatedEvent : clubEvent,
        ),
        loading: false,
      }));

      return updatedEvent;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to remove event image",
      });

      throw error;
    }
  },

  async deleteClubEvent(eventId) {
    set({
      loading: true,
      error: null,
    });

    try {
      await clubEventsApi.delete(eventId);

      set((state) => ({
        clubEvents: state.clubEvents.filter((event) => event.id !== eventId),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Failed to delete Club event"),
      });

      throw error;
    }
  },

  reset() {
    set({
      clubEvents: [],
      loading: false,
      error: null,
    });
  },
}));
