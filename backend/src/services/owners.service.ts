import { mockOwners } from "../data";

export const ownersService = {
  getAllOwners() {
    return mockOwners;
  },

  getOwnerById(ownerId: string) {
    return mockOwners.find((owner) => owner.id === ownerId);
  },
};
