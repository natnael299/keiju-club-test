import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ownersApi } from "@/services/owners.api";
import type { Owner } from "@/types";

type OwnerStore = {
  owners: Owner[];
  selectedOwnerId: string | null;
  loading: boolean;

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

      async fetchOwners(ownerIds) {
        set({
          loading: true,
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
          }));
        } catch (error) {
          console.error("OWNER FETCH ERROR:", error);

          set({
            owners: [],
            loading: false,
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
