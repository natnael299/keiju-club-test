import type { User } from "../types/index.js";

export const mockUsers: User[] = [
  {
    id: "usr7f52c9a21e84c4aa8d16d0b5e30291",
    role: "caretaker",
    fullName: "Aino Korhonen",
    email: "aino@example.com",
    passwordHash: "$2b$10$mock-password-hash",
    ownerIds: [
      "me675d10f00ca1ee103726e36f3d235c",
      "me9c4a23d1ab44f21b98371c2fd6ab42",
    ],
    cdt: "2026-06-01T09:00:00.000Z",
    ldt: "2026-06-01T09:00:00.000Z",
  },
  {
    id: "usr2a42b8d8e5e74db5a3021fd6bc882a",
    role: "nurse",
    fullName: "Laura Nieminen",
    email: "laura@example.com",
    passwordHash: "$2b$10$mock-password-hash",
    ownerIds: ["me675d10f00ca1ee103726e36f3d235c"],
    cdt: "2026-06-01T09:10:00.000Z",
    ldt: "2026-06-01T09:10:00.000Z",
  },
];
