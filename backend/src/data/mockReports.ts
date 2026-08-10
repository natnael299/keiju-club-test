import type { WeeklyReport } from "../types/index.js";

export const mockReports: WeeklyReport[] = [
  {
    id: "report-2026-23",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 23,

    startDate: "2026-06-01",
    endDate: "2026-06-07",

    createdAt: "2026-06-08T08:00:00.000Z",

    isCurrent: false,

    status: "attention",

    summary:
      "Viikon aikana päivittäinen rytmi pysyi pääosin vakaana. Aamuliike oli hieman tavallista hitaampaa ja yhtenä päivänä keittiöaktiivisuutta havaittiin tavallista vähemmän. Yöllä tapahtui muutamia sängystä poistumisia, mutta ne olivat pääosin lyhyitä. Muuten päivittäisessä liikkumisessa ei havaittu merkittäviä muutoksia.",

    observations: [
      "Aamuliike oli tavanomaista hitaampaa muutamana aamuna.",
      "Keittiöaktiivisuus jäi yhtenä päivänä tavallista vähäisemmäksi.",
      "Yöllisiä sängystä poistumisia havaittiin useita, mutta ne olivat lyhyitä.",
      "Päivittäinen kokonaisliike pysyi vakaana.",
    ],

    recommendation:
      "Tilannetta voidaan jatkaa normaalilla seurannalla. Aamuliikkeen ja ruokailuun liittyvän aktiivisuuden kehitystä kannattaa seurata seuraavan viikon aikana.",
  },

  {
    id: "report-2026-24",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 24,

    startDate: "2026-06-08",
    endDate: "2026-06-14",

    createdAt: "2026-06-15T08:00:00.000Z",

    isCurrent: false,

    status: "stable",

    summary:
      "Viikko oli kokonaisuutena rauhallinen. Päivittäiset rutiinit, aamuliike ja keittiöaktiivisuus vastasivat pääosin tavanomaista rytmiä. Yöaikaisia poikkeamia havaittiin vain vähän eikä merkittäviä muutoksia toimintakyvyssä tullut esiin.",

    observations: [
      "Aamurutiini toteutui normaalisti.",
      "Keittiöaktiivisuus pysyi tasaisena.",
      "Yöaikaisia poikkeamia havaittiin vain vähän.",
      "Päivittäinen liikkuminen pysyi tavanomaisella tasolla.",
    ],

    recommendation:
      "Ei erityisiä jatkotoimenpiteitä. Normaalia seurantaa voidaan jatkaa.",
  },

  {
    id: "report-2026-25",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 25,

    startDate: "2026-06-15",
    endDate: "2026-06-21",

    createdAt: "2026-06-22T08:00:00.000Z",

    isCurrent: false,

    status: "attention",

    summary:
      "Viikon aikana havaittiin hieman tavanomaista vähemmän aamuliikettä, mutta muuten päivittäinen aktiivisuus pysyi vakaana. Keittiön käyttö vastasi normaalia rytmiä ja yölliset sängystä poistumiset olivat lyhyitä. Kokonaisuutena viikossa ei havaittu merkittävää muutosta.",

    observations: [
      "Aamuliike oli tavallista hitaampaa kahtena päivänä.",
      "Keittiöaktiivisuus pysyi normaalina.",
      "Yölliset sängystä poistumiset olivat lyhyitä.",
      "Kokonaisaktiivisuus pysyi vakaana.",
    ],

    recommendation:
      "Aamuliikkeen kehitystä kannattaa seurata, mutta välittömälle jatkotoimenpiteelle ei ole tarvetta.",
  },

  {
    id: "report-2026-32",

    ownerId: "me675d10f00ca1ee103726e36f3d235c",

    week: 32,

    startDate: "2026-08-03",
    endDate: "2026-08-09",

    createdAt: "2026-08-10T05:00:00.000Z",

    isCurrent: true,

    status: "stable",

    summary:
      "Kulunut viikko oli kokonaisuutena vakaa. Päivittäinen aktiivisuus, aamurutiinit ja keittiön käyttö vastasivat henkilön tavanomaista rytmiä. Yöllä havaittiin muutamia lyhyitä sängystä poistumisia, mutta niissä ei ollut poikkeavaa kehitystä. Merkittäviä muutoksia toimintakyvyssä tai päivittäisissä rutiineissa ei havaittu.",

    observations: [
      "Aamuliike vastasi tavanomaista rytmiä.",
      "Keittiöaktiivisuus pysyi normaalina.",
      "Yölliset sängystä poistumiset olivat lyhyitä.",
      "Päivittäinen aktiivisuus pysyi vakaana.",
    ],

    recommendation: "Normaalia seurantaa voidaan jatkaa.",
  },
];
