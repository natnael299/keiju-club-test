import type { User } from "../types/index.js";

export const mockUsers: User[] = [
  // CARETAKER
  {
    _id: "usr7f52c9a21e84c4aa8d16d0b5e30291",
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
    _id: "usr283ac47149fb47f590cb413f84cbb0",
    role: "caretaker",
    fullName: "Liisa Virtanen",
    email: "liisa@example.com",
    passwordHash: "$2b$10$mock-password-hash",

    ownerIds: ["me675d10f00ca1ee103726e36f3d235c"],

    cdt: "2026-06-01T09:10:00.000Z",
    ldt: "2026-06-01T09:10:00.000Z",
  },

  {
    _id: "usr9c258e71fd904d24b89c374c51a7aa",
    role: "caretaker",
    fullName: "Jari Korhonen",
    email: "jari@example.com",
    passwordHash: "$2b$10$mock-password-hash",

    ownerIds: ["me9c4a23d1ab44f21b98371c2fd6ab42"],

    cdt: "2026-06-01T09:20:00.000Z",
    ldt: "2026-06-01T09:20:00.000Z",
  },

  // ORGANIZATION REPRESENTATIVES
  {
    _id: "usrorg91f4ab302cfe44aa893b4614f73a01",
    role: "organizationRep",
    fullName: "Sari Lahtinen",
    email: "sari@senioriliikunta.fi",
    passwordHash: "$2b$10$mock-password-hash",

    organizationId: "org91c7de4a8f234c2ea6b1d920a4f70c",

    cdt: "2026-06-01T10:00:00.000Z",
    ldt: "2026-06-01T10:00:00.000Z",
  },

  {
    _id: "usrorg82f45cb789d84dad9553c10e47c822",
    role: "organizationRep",
    fullName: "Kevin James",
    email: "kevin12@senioriliikunta.fi",
    passwordHash: "$2b$10$mock-password-hash",

    organizationId: "org91c7de4a8f234c2ea6b1d920a4f70c",

    cdt: "2026-06-01T10:10:00.000Z",
    ldt: "2026-06-01T10:10:00.000Z",
  },

  {
    _id: "usrorg36b5f767eaa44af08bcccf74bde829",
    role: "organizationRep",
    fullName: "Mikko Salonen",
    email: "mikko@kulttuuriaamu.fi",
    passwordHash: "$2b$10$mock-password-hash",

    organizationId: "org38bfa916c0e241a79d45e3ac763a22",

    cdt: "2026-06-01T10:20:00.000Z",
    ldt: "2026-06-01T10:20:00.000Z",
  },
];
