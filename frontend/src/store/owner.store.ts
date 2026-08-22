import { create } from "zustand";

import { persist } from "zustand/middleware";

import { ownersApi } from "@/services/owners.api";

import type { Owner } from "@/types";

type OwnerStore = {
  owners: Owner[];
  selectedOwnerId: string | null;
  loading: boolean;
  error: string | null;

  fetchOwners: (ownerIds: string[]) => Promise<void>;

  setSelectedOwnerId: (ownerId: string) => void;

  getSelectedOwner: () => Owner | undefined;

  reset: () => void;
};

export const useOwnerStore = create<OwnerStore>()(
  persist(
    (set, get) => ({
      owners: [],
      selectedOwnerId: null,
      loading: false,
      error: null,

      async fetchOwners(ownerIds) {
        set({
          loading: true,
          error: null,
        });

        try {
          const owners = await Promise.all(
            ownerIds.map((ownerId) => ownersApi.getById(ownerId)),
          );

          set((state) => ({
            owners,

            selectedOwnerId:
              state.selectedOwnerId &&
              owners.some((owner) => owner.id === state.selectedOwnerId)
                ? state.selectedOwnerId
                : (owners[0]?.id ?? null),

            loading: false,
            error: null,
          }));
        } catch (error) {
          console.error("OWNER FETCH ERROR:", error);

          set({
            owners: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "People could not be loaded.",
          });
        }
      },

      setSelectedOwnerId(ownerId) {
        set({
          selectedOwnerId: ownerId,
        });
      },

      getSelectedOwner() {
        const { owners, selectedOwnerId } = get();

        return owners.find((owner) => owner.id === selectedOwnerId);
      },

      reset() {
        set({
          owners: [],
          selectedOwnerId: null,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: "keiju-owner",

      partialize: (state) => ({
        selectedOwnerId: state.selectedOwnerId,
      }),
    },
  ),
);
