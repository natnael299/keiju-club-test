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

  fetchClubEvents: () => Promise<void>;

  createClubEvent: (event: CreateClubEventPayload) => Promise<ClubEvent>;

  updateClubEvent: (
    eventId: string,
    event: UpdateClubEventPayload,
  ) => Promise<ClubEvent>;
};

export const useClubEventsStore = create<ClubEventsStore>((set) => ({
  clubEvents: [],
  loading: false,

  async fetchClubEvents() {
    set({ loading: true });

    try {
      const clubEvents = await clubEventsApi.getAll();

      set({
        clubEvents,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  async createClubEvent(event) {
    set({ loading: true });

    try {
      const createdEvent = await clubEventsApi.create(event);

      set((state) => ({
        clubEvents: [...state.clubEvents, createdEvent],
        loading: false,
      }));

      return createdEvent;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  async updateClubEvent(eventId, event) {
    set({ loading: true });

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
      set({ loading: false });
      throw error;
    }
  },
}));
