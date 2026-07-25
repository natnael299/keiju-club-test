import type { Organizer } from "../types";

export const mockOrganizers: Organizer[] = [
  {
    id: "org91c7de4a8f234c2ea6b1d920a4f70c",
    organizationName: "Turku Senioriliikunta ry",
    contactPerson: "Sari Lahtinen",
    email: "sari@senioriliikunta.fi",
    passwordHash: "$2b$10$mock-password-hash",
    cdt: "2026-06-01T10:00:00.000Z",
    ldt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: "org38bfa916c0e241a79d45e3ac763a22",
    organizationName: "Kulttuurikeskus Aamu",
    contactPerson: "Mikko Salonen",
    email: "mikko@kulttuuriaamu.fi",
    passwordHash: "$2b$10$mock-password-hash",
    cdt: "2026-06-01T10:20:00.000Z",
    ldt: "2026-06-01T10:20:00.000Z",
  },
];
