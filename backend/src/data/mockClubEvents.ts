import type { ClubEvent } from "../types";

export const mockClubEvents: ClubEvent[] = [
  {
    id: "evt3b7f9c2a81d94e6fa2450b13c8a7d1",
    organizerId: "org91c7de4a8f234c2ea6b1d920a4f70c",
    title: "Gentle chair yoga",
    description:
      "A calm chair yoga session focused on balance, breathing, and light movement.",
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b",
    categories: ["exercise", "health"],
    audience: "owner",
    address: "Aurakatu 12",
    city: "Turku",
    startsAt: "2026-07-08T10:00:00.000Z",
    endsAt: "2026-07-08T11:00:00.000Z",
    cdt: "2026-06-10T09:00:00.000Z",
    ldt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "evt84d2e9a64f764c3ea8b214de9235ca",
    organizerId: "org38bfa916c0e241a79d45e3ac763a22",
    title: "Guided museum visit",
    description:
      "A relaxed guided visit with time for coffee and conversation afterwards.",
    imageUrl: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08",
    categories: ["culture", "social"],
    audience: "both",
    address: "Linnankatu 80",
    city: "Turku",
    startsAt: "2026-07-12T12:00:00.000Z",
    endsAt: "2026-07-12T14:00:00.000Z",
    cdt: "2026-06-10T09:20:00.000Z",
    ldt: "2026-06-10T09:20:00.000Z",
  },
  {
    id: "evtd0a31c9b4e7e4b5f81c6028f2a5d9e",
    organizerId: "org91c7de4a8f234c2ea6b1d920a4f70c",
    title: "Family caregiver support evening",
    description:
      "An evening for family caretakers to learn, ask questions, and meet others.",
    categories: ["learning", "social"],
    audience: "caretaker",
    address: "Yliopistonkatu 24",
    city: "Turku",
    startsAt: "2026-07-16T16:30:00.000Z",
    endsAt: "2026-07-16T18:00:00.000Z",
    cdt: "2026-06-11T08:00:00.000Z",
    ldt: "2026-06-11T08:00:00.000Z",
  },
];
