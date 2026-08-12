import type { Organization } from "../types/index.js";

export const mockOrganizations: Organization[] = [
  {
    id: "org91c7de4a8f234c2ea6b1d920a4f70c",

    name: "Turku Senioriliikunta ry",

    address: "Aurakatu 12",
    city: "Turku",

    email: "info@senioriliikunta.fi",
    phone: "+358401234567",

    cdt: "2026-06-01T10:00:00.000Z",
    ldt: "2026-06-01T10:00:00.000Z",
  },

  {
    id: "org38bfa916c0e241a79d45e3ac763a22",

    name: "Kulttuurikeskus Aamu",

    address: "Linnankatu 80",
    city: "Turku",

    email: "info@kulttuuriaamu.fi",
    phone: "+358409876543",

    cdt: "2026-06-01T10:20:00.000Z",
    ldt: "2026-06-01T10:20:00.000Z",
  },
];
