import { create } from "zustand";
import { ownersApi } from "@/services/owners.api";
import type { Owner } from "@/types";

type OwnerStore = {
  owners: Owner[];
  selectedOwnerId: string | null;
  loading: boolean;

  fetchOwners: () => Promise<void>;
  setSelectedOwnerId: (ownerId: string | null) => void;
  getSelectedOwner: () => Owner | undefined;
};

export const useOwnerStore = create<OwnerStore>((set, get) => ({
  owners: [],
  selectedOwnerId: null,
  loading: false,

  async fetchOwners() {
    set({ loading: true });

    try {
      const owners = await ownersApi.getAll();

      set((state) => ({
        owners,
        selectedOwnerId: state.selectedOwnerId ?? owners[0]?.id ?? null,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  setSelectedOwnerId: (ownerId) => {
    set({ selectedOwnerId: ownerId });
  },

  getSelectedOwner() {
    const { owners, selectedOwnerId } = get();
    return owners.find((owner) => owner.id === selectedOwnerId);
  },
}));
