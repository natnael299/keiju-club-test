import { ownersService } from "../services/owners.service";
export const ownersController = {
    getAllOwners(_req, res) {
        const owners = ownersService.getAllOwners();
        res.json(owners);
    },
    getOwnerById(req, res) {
        const owner = ownersService.getOwnerById(req.params.ownerId);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }
    },
};
