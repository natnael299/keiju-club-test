import type { WeeklyReport } from "../types/index.js";

export const mockReports: WeeklyReport[] = [
  // MAIJA - PREVIOUS REPORT

  {
    _id: "report-maija-2026-31",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 31,

    startDate: "2026-07-27",
    endDate: "2026-08-02",

    isCurrent: false,

    status: "attention",

    summary:
      "Viikon aikana päivittäinen rytmi pysyi pääosin vakaana. Aamuliike oli hieman tavallista hitaampaa ja yhtenä päivänä keittiöaktiivisuutta havaittiin tavallista vähemmän. Muuten päivittäisessä liikkumisessa ei havaittu merkittäviä muutoksia.",

    observations: [
      "Aamuliike oli tavanomaista hitaampaa muutamana aamuna.",
      "Keittiöaktiivisuus jäi yhtenä päivänä tavallista vähäisemmäksi.",
      "Päivittäinen kokonaisliike pysyi vakaana.",
    ],

    recommendation:
      "Aamuliikkeen ja ruokailuun liittyvän aktiivisuuden kehitystä kannattaa seurata.",

    cdt: "2026-08-03T08:00:00.000Z",
    ldt: "2026-08-03T08:00:00.000Z",
  },

  // MAIJA - CURRENT REPORT

  {
    _id: "report-maija-2026-32",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 32,

    startDate: "2026-08-03",
    endDate: "2026-08-09",

    isCurrent: true,

    status: "stable",

    summary:
      "Kulunut viikko oli kokonaisuutena vakaa. Päivittäinen aktiivisuus, aamurutiinit ja keittiön käyttö vastasivat henkilön tavanomaista rytmiä. Merkittäviä muutoksia toimintakyvyssä tai päivittäisissä rutiineissa ei havaittu.",

    observations: [
      "Aamuliike vastasi tavanomaista rytmiä.",
      "Keittiöaktiivisuus pysyi normaalina.",
      "Yölliset sängystä poistumiset olivat lyhyitä.",
      "Päivittäinen aktiivisuus pysyi vakaana.",
    ],

    recommendation: "Normaalia seurantaa voidaan jatkaa.",

    cdt: "2026-08-10T05:00:00.000Z",
    ldt: "2026-08-10T05:00:00.000Z",
  },

  // PENTTI - PREVIOUS REPORT

  {
    _id: "report-pentti-2026-31",

    ownerId: "me9c4a23d1ab44f21b98371c2fd6ab42",

    week: 31,

    startDate: "2026-07-27",
    endDate: "2026-08-02",

    isCurrent: false,

    status: "stable",

    summary:
      "Viikko oli kokonaisuutena rauhallinen. Päivittäinen aktiivisuus ja kodin sisäinen liikkuminen vastasivat pääosin tavallista rytmiä.",

    observations: [
      "Päivittäinen liikkuminen pysyi tasaisena.",
      "Aamurutiineissa ei havaittu merkittäviä muutoksia.",
      "Yöaikainen aktiivisuus pysyi normaalina.",
    ],

    recommendation: "Normaalia seurantaa voidaan jatkaa.",

    cdt: "2026-08-03T08:15:00.000Z",
    ldt: "2026-08-03T08:15:00.000Z",
  },

  // PENTTI - CURRENT REPORT

  {
    _id: "report-pentti-2026-32",

    ownerId: "me9c4a23d1ab44f21b98371c2fd6ab42",

    week: 32,

    startDate: "2026-08-03",
    endDate: "2026-08-09",

    isCurrent: true,

    status: "attention",

    summary:
      "Viikon aikana aamun aktiivisuudessa havaittiin hieman tavanomaista hitaampi alku muutamana päivänä. Muuten päivittäinen liikkuminen pysyi vakaana.",

    observations: [
      "Aamuliike oli hieman tavallista hitaampaa.",
      "Päivittäinen kokonaisaktiivisuus pysyi vakaana.",
      "Merkittäviä muutoksia yöaikaisessa aktiivisuudessa ei havaittu.",
    ],

    recommendation:
      "Aamun aktiivisuutta kannattaa seurata seuraavan viikon aikana.",

    cdt: "2026-08-10T05:15:00.000Z",
    ldt: "2026-08-10T05:15:00.000Z",
  },
];
