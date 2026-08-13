import type { RawNotification } from "../types/index.js";

export const mockNotifications: RawNotification[] = [
  {
    _id: "2026-08-08:9f3a2b8c7d1e4a6b",

    type: "notif",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    ownerName: "Maija Virtanen",

    dt: "2026-08-08T07:42:00.000Z",
    cdt: "2026-08-08T07:42:12.000Z",
    ldt: "2026-08-08T07:42:12.000Z",

    ts: 1786174920000,

    level: "20",

    term: "out_of_bed",
    category: "sleep",

    content: {
      interruptions: 5,
      usualRange: "1-2",
      period: "night",
    },

    position: {
      city: "Turku",
      address: "Esimerkkikatu 4",
      area: "Bedroom",
      floor: "2",
    },

    reviewed: false,
  },

  {
    _id: "2026-08-09:4e8d2a91bc6f43e0",

    type: "notif",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    ownerName: "Maija Virtanen",

    dt: "2026-08-09T11:15:00.000Z",
    cdt: "2026-08-09T11:15:08.000Z",
    ldt: "2026-08-09T11:15:08.000Z",

    ts: 1786274100000,

    level: "30",

    term: "no_kitchen_activity",
    category: "nutrition",

    content: {
      detectedVisits: 0,
      expectedMinimumVisits: 2,
      period: "morning",
    },

    position: {
      city: "Turku",
      address: "Esimerkkikatu 4",
      area: "Kitchen",
      floor: "2",
    },

    reviewed: true,
  },

  {
    _id: "2026-08-10:7c1b6e28f90d4a12",

    type: "notif",

    ownerId: "me9c4a23d1ab44f21b98371c2fd6ab42",

    ownerName: "Pentti Korhonen",

    dt: "2026-08-10T08:05:00.000Z",
    cdt: "2026-08-10T08:05:20.000Z",
    ldt: "2026-08-10T08:05:20.000Z",

    ts: 1786349100000,

    level: "40",

    term: "low_morning_activity",
    category: "activity",

    content: {
      activityLevel: "below_usual",
      comparisonPeriod: "last_7_days",
    },

    position: {
      city: "Turku",
      address: "Rauhankatu 10",
      area: "Living room",
      floor: "1",
    },

    reviewed: false,
  },

  {
    _id: "2026-08-11:93d6c7a20e4b4f18",

    type: "notif",

    ownerId: "me9c4a23d1ab44f21b98371c2fd6ab42",

    ownerName: "Pentti Korhonen",

    dt: "2026-08-11T06:55:00.000Z",
    cdt: "2026-08-11T06:55:15.000Z",
    ldt: "2026-08-11T06:55:15.000Z",

    ts: 1786420500000,

    level: "80",

    term: "sensor_offline",
    category: "device",

    content: {
      deviceName: "Bedroom motion sensor",

      offlineSince: "2026-08-11T06:30:00.000Z",
    },

    position: {
      city: "Turku",
      address: "Rauhankatu 10",
      area: "Bedroom",
      floor: "1",
    },

    reviewed: true,
  },
];
