import { mockOwners } from "../data/index.js";

export const ownersService = {
  getAllOwners() {
    return mockOwners;
  },

  getOwnerById(ownerId: string) {
    return mockOwners.find((owner) => owner.id === ownerId);
  },
};
