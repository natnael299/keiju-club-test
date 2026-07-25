import { mockOwners } from "../data";
export const ownersService = {
    getAllOwners() {
        return mockOwners;
    },
    getOwnerById(ownerId) {
        return mockOwners.find((owner) => owner.id === ownerId);
    },
};
