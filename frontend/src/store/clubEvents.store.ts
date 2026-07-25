import { create } from "zustand";
import { clubEventsApi } from "@/services/clubEvents.api";
import type { ClubEvent } from "@/types";

type ClubEventsStore = {
  clubEvents: ClubEvent[];
  loading: boolean;

  fetchClubEvents: () => Promise<void>;
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
}));
